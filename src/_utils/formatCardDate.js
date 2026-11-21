const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

export function formatCardDate(date) {
  if (!date) {
    return ""
  }

  const parsedDate = new Date(`${date}T00:00:00Z`)
  const dateParts = Object.fromEntries(
    dateFormatter
      .formatToParts(parsedDate)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  )
  const day = parsedDate.getUTCDate()
  const suffix =
    day % 100 >= 11 && day % 100 <= 13
      ? "th"
      : { 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th"

  return `${day}${suffix} ${dateParts.month} ${dateParts.year}`
}
