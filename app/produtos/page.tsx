'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Product } from '../../models/interfaces'
import ProdutosCard from '@/components/ProdutosCard';

export default function ProdutosPage() {

  //
  // A. Gestão de Estados- useState
  const [cart, setCart] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState<Product[]>([])


  //
  // B. Fetch de Dados - useSWR
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR<Product[], Error>('api/products', fetcher)


  //
  // C. Transformação/processamento de Dados


  //
  // D. Funções utilitárias


  //
  // E. Handlers (interações do utilizador)
  function addItemToCart(product: Product) {
    setCart((prev) => // Assíncrono, logo devo usar useState e useEffect
     [...prev, product]
    )
  }


  //
  // F. Efeitos - useEffect
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if(cart) {
      setCart(JSON.parse(cart))
    }
  }, [])

  useEffect(() => {

    if (data) {
      const newFilteredData = data.filter((p) => {
        return p.title.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredData(newFilteredData)
    }

  }, [search, data])


  //
  // G. Renderização de Componentes
  if (error) return <div>Error loading data</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>No data!</div>

  return <section className="overflow-auto h-full flex flex-wrap justify-center">  

    <section>
      <h2>Pesquisa de Produtos</h2>
      <input placeholder="Pesquisar"
        value={search}
        onChange={e => setSearch(e.target.value)} />
    </section>

    <section>
      <h2>Selecione os seus Produtos</h2>
      { filteredData.map( p => (
        <ProdutosCard
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          description={p.description}
          category={p.category}
          image={p.image}
          rating={p.rating}
          product={p}
          addItemToCart={addItemToCart}
          isSelected={cart.some(item => item.id === p.id)}
        />
      ))}
    </section>

    <section>
      <h2>Produtos Selecionados</h2>
      {cart.map(p => (
        <ProdutosCard
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          description={p.description}
          category={p.category}
          image={p.image}
          rating={p.rating}
          product={p}
          addItemToCart={addItemToCart}
          isSelected={true}
        />
      ))}
    </section>

  </section>
}