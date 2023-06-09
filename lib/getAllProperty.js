import React from 'react'

export default async function getAllProperty() {
    const res=await fetch('https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=0&limit=0&sortField=updated_at&sortDirection=desc&whereField=&whereValue=')
    

    if(!res.ok) throw new Error('Failed to fetch data')
  return  res.json()
}
