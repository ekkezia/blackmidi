import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2023-10-16', // use a UTC date string
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const data = await client.fetch(`*[_type == "song"]`)