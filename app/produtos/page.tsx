'use client'

import React from 'react'
import useSWR from 'swr'
import { Product } from '../../models/interfaces'
import ProdutosCard from '@/components/ProdutosCard';

export default function ProdutosPage() {

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR<Product[], Error>('api/products', fetcher)

  if (error) return <div>Error loading data</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>No data!</div>

  return <>
    { data.map( p => (
        <ProdutosCard
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          description={p.description}
          category={p.category}
          image={p.image}
          rating={p.rating}
        />  
      ))}
  </>
}
