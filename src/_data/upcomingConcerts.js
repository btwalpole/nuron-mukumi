import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ct7ldo6w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-01',
})

export default async function () {
  return client.fetch(`
    *[
      _type == "concert" &&
      date >= now()
    ] | order(date asc) [0...3] {
      _id,
      title,
      description,
      date,
      venue,
      link
    }
  `)
}
