import { createClient } from '@sanity/client';

export const client = createClient({
  // Sanity.io manage panelinden bunları bul
  projectId: 'oguxrlkq', 
  dataset: 'production', 
  useCdn: true, // `false` for fresh data
  apiVersion: '2024-07-04', // veya bugünün tarihi
});