import { click, goto, openBrowser, write, $, radioButton, textBox, dropDown, checkBox, text, to, waitFor, closeBrowser } from "taiko"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import config from "./config.json"

dayjs.extend(utc)

const today = dayjs().utcOffset(0).startOf('day').date()
const time_slots = Array.from({ length: (18 - 6) * 2 }, (_, i) => {
  const hour: string = (Math.floor(i / 2) + 6).toString()


  const minute: string | number = i % 2 === 0 ? '00' : 10
  return `${hour.length === 1 ? "0" + hour : hour}:${minute}`
})

async function tryToSchedule(): Promise<boolean> {
  for (const time_slot of time_slots) {
    console.log("trying time slot: " + time_slot)
    try {
      await click(time_slot)
      const element = await $(time_slot);
      const class_name = await element.attribute("class")
      if (class_name.includes(" bookable")) {
        console.log("selected time slot:", time_slot)
        return true;
      }
    } catch (error) {
      console.log("error selecting time slot:", time_slot)
    } finally {
      return tryToSchedule()
    }
  }

  return false
}

async function main() {
  await openBrowser({ headless: false })
  await goto("https://outlook.office365.com/owa/calendar/RAMQ_bureau_MTL@azqmar.onmicrosoft.com/bookings/")

  await radioButton({
    id: "service_2"
  }).select()
  await write(config.full_name, textBox("Name"))
  await write(config.email, textBox("Email"))
  await dropDown({
    'aria-label': "SelectCoutryCode"
  }).select("Canada +1")

  await write(config.phone, textBox("Add your phone number"))
  await write(config.phone, textBox({
    'aria-labelledby': "TextFieldLabel17"
  }))
  await checkBox({
    id: "sendSmsCheckBox"
  }).check()

  await write("2", textBox({
    'aria-labelledby': "TextFieldLabel20"
  }))
  await checkBox({
    id: "consentCheckBox"
  }).check()

  await click(today.toString())

  const time_slots_no_availability_text = await text('There is no availability on this date. Please choose another one.'
  )

  if (await to(time_slots_no_availability_text).exists()) {
    console.log("No availability on this date")
    await waitFor(60000)
    await closeBrowser()
    await main()
    return
  }

  let slot_selected = tryToSchedule()

  if (!slot_selected) {
    console.log("No available time slot found")


    return
  }

  await click('[type="submit"]')
}

main().catch(console.error)