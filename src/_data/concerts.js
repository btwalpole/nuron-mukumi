import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ct7ldo6w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-01',
})

export default async function () {
  const concerts = await client.fetch(`
    *[_type == "concert"] | order(date asc) {
      _id,
      title,
      description,
      date,
      venue,
      link
    }
  `)

  const today = new Date().toISOString().slice(0, 10)
  const formatDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  })
  const formatWeekday = new Intl.DateTimeFormat("en", {
    weekday: "short",
    timeZone: "UTC",
  })
  const formatMonth = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })

  const concertsWithFormattedDates = concerts.map((concert) => {
    const date = concert.date ? new Date(`${concert.date}T00:00:00Z`) : null

    return {
      ...concert,
      formattedDate: date ? formatDate.format(date) : "",
      day: date ? date.getUTCDate() : "",
      weekday: date ? formatWeekday.format(date) : "",
    }
  })

  const groupByMonth = (items) => {
    const groups = new Map()

    for (const concert of items) {
      const month = concert.date.slice(0, 7)
      if (!groups.has(month)) {
        groups.set(month, {
          label: formatMonth.format(new Date(`${month}-01T00:00:00Z`)),
          concerts: [],
        })
      }

      groups.get(month).concerts.push(concert)
    }

    return Array.from(groups.values())
  }

  const upcoming = concertsWithFormattedDates.filter(
    (concert) => concert.date >= today,
  )
  const past = concertsWithFormattedDates.filter(
    (concert) => concert.date < today,
  )

  return {
    concerts: concertsWithFormattedDates,
    upcoming,
    past,
    upcomingGroups: groupByMonth(upcoming),
    pastGroups: groupByMonth(past),
  }
}
