import { sanityFetch } from './live'

export interface CareerListItem {
  _id: string
  _createdAt?: string
  title: string
  slug?: { current?: string }
  coverImage?: {
    asset?: { _ref?: string }
  }
}

const careersListQuery = `*[_type == "career"] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  coverImage
}`

export async function getCareersList(): Promise<CareerListItem[]> {
  const { data } = await sanityFetch({
    query: careersListQuery,
    tags: ['career'],
  })

  return data as CareerListItem[]
}
