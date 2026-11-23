import { sanityFetch } from './live'

interface CareerImage {
  asset?: { _ref?: string }
  alt?: string
}

interface CareerBodyItem {
  _type?: string
  children?: Array<{ _type?: string; text?: string }>
  asset?: { _ref?: string }
  alt?: string
}

export interface CareerBySlugResult {
  _id: string
  _createdAt?: string
  title: string
  coverImage?: CareerImage
  body?: CareerBodyItem[]
  downloadableFile?: {
    asset?: {
      url?: string
      originalFilename?: string
      mimeType?: string
    }
  }
}

export async function getCareerBySlug(
  slug: string,
): Promise<CareerBySlugResult | null> {
  const query = `*[_type == "career" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    coverImage,
    body,
    downloadableFile {
      asset -> {
        url,
        originalFilename,
        mimeType
      }
    }
  }`

  const { data } = await sanityFetch({
    query,
    params: { slug },
    tags: ['career'],
  })

  return data as CareerBySlugResult | null
}
