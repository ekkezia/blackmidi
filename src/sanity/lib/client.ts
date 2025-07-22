import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: 'n33clf8c',
  dataset: 'production',
  apiVersion: '2025-07-21',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const data = await client.fetch(`*[_type == "song"]`)