import { createClient } from '@sanity/client'
import { toHTML } from "@portabletext/to-html";

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
      image,
      teaser
    }
  `)
  // Drop empty paragraphs left in the Sanity text, which otherwise add stray gaps
  const isEmptyBlock = (block) =>
    block._type === "block" &&
    (block.children ?? []).every((child) => !child.text?.trim())

  // Sanity asset refs encode the original size, e.g. image-<id>-3648x5472-jpg
  const imageDimensions = (image) => {
    const match = image?.asset?._ref?.match(/-(\d+)x(\d+)-/)
    return match ? { width: Number(match[1]), height: Number(match[2]) } : null
  }

  return response.map((biography) => ({
    ...biography,
    bodyHtml: toHTML((biography.body ?? []).filter((block) => !isEmptyBlock(block))),
    imageDimensions: imageDimensions(biography.image),
  }))
}

