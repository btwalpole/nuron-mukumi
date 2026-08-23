import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ct7ldo6w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-01',
})

export default async function () {
  const response = await client.fetch(`
    *[_type == "homePage"][0] {
      _id,
      featuredConcert-> {
        title,
        quote,
        youtubeId,
        description,
      },
      featuredAlbum-> {
        title,
        quote,
        description,
        artwork,
        link,
        supportingInfo
      },
    }
  `)

console.log(JSON.stringify(response, null, 2))


  return response
}