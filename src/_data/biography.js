import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ct7ldo6w',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-01',
})

export default async function () {
  const response = await client.fetch(`
    *[_type == "biography"] {
      _id,
      body,
      image
    }
  `)
  console.log(JSON.stringify(response, null, 2))
  return response
}


