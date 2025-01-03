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
  const [coupon, setCoupon] = useState("")
  const [student, setStudent] = useState(false)


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
        student: student,
        coupon: coupon,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    }).then(() => {
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

  return (
    <main className="overflow-auto h-full flex flex-col justify-start text-center">  
      <section className="mb-4">
        <h2>Pesquisa de Produtos</h2>
        <input 
          placeholder="Pesquisar"
          value={search}
          onChange={e => setSearch(e.target.value)} 
          className="p-2 border border-gray-300 rounded"
        />
      </section>

      <section className="mb-4">
        <h2>Selecione os seus Produtos</h2>
        <div className="flex flex-wrap justify-center">
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
        </div>
      </section>

      <section className="mb-4">
        <h2>Produtos Selecionados</h2>
        <div className="flex flex-wrap justify-center">
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
        </div>
        <h3>Preço Total: {cart.reduce((acc, p) => acc + p.price, 0)}€</h3>
        <p>
          <label>És estudante do DEISI?</label>
          <input 
            type="checkbox" 
            checked={student}
            onChange={e => setStudent(e.target.checked)}
          />
        </p>
        <p>
          <label>Cupão de Desconto:</label>
          <input 
            type="text" 
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
          />
        </p>
        <button
          className="bg-blue-400 rounded-md p-2"
          onClick={buy}
        >
          Comprar
        </button>
      </section>
    </main>
  )
}