'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Product } from '../../models/interfaces'
import ProdutosCard from '@/components/ProdutosCard';

export default function ProdutosPage() {

  //
  // A. Gestão de Estados (useState)
  const [cart, setCart] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState<Product[]>([])


  //
  // B. Fetch de Dados (useSWR)
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR<Product[], Error>('api/products', fetcher)

  const buy = () => {
    fetch("api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: false,
        coupon:"",
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    }).then((response) => {
      setCart([])
    }).catch(() => {
      console.log("erro ao comprar")
    })
  }


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

  function removeItemFromCart(product: Product) {
    setCart((prev) => {
      const index = prev.findIndex(p => p.id === product.id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  }


  //
  // F. Efeitos (useEffect)
  useEffect(() => {
    const localCart = localStorage.getItem("cart") || '[]';
    if(cart) {
      setCart(JSON.parse(localCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

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
          removeItemFromCart={removeItemFromCart}
          isSelected={false}
        />
      ))}
    </section>

    <section>
      <h2>Produtos Selecionados</h2>
      {cart.map((p, index) => (
        <ProdutosCard
          key={`${p.id}-${index}`}
          id={p.id}
          title={p.title}
          price={p.price}
          description={p.description}
          category={p.category}
          image={p.image}
          rating={p.rating}
          product={p}
          addItemToCart={addItemToCart}
          removeItemFromCart={removeItemFromCart}
          isSelected={true}
        />
      ))}
      <button
        className="bg-blue-400 rounded-md"
        onClick={buy}
      >
        Comprar
      </button>
    </section>

  </section>
}