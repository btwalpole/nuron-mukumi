import { createClient } from '@sanity/client'
import { formatCardDate } from '../_utils/formatCardDate.js'

const client = createClient({
  projectId: 'ct7ldo6w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-01',
})

export default async function () {
  const articles = await client.fetch(`
    *[_type == "article"] | order(date desc) {
      _id,
      title,
      description,
      date,
      location,
      quote
    }
  `)

  return articles.map((article) => ({
    ...article,
    formattedDate: formatCardDate(article.date),
  }))
}
