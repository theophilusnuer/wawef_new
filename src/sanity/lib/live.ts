// Querying with "sanityFetch" revalidates every 5 minutes.
// Render "<SanityLive />" only when you want instant push updates.
import { defineLive } from "next-sanity/live";
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN;
const SANITY_REVALIDATE_SECONDS = 300;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token || false,
  browserToken: token || false,
  fetchOptions: {
    revalidate: SANITY_REVALIDATE_SECONDS,
  },
});
