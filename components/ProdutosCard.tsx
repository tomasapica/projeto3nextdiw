import { Product } from '@/models/interfaces'
import React from 'react'

// props = properties/propriedades
export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
      rate: number;
      count: number;
  }
  product: Product
  addItemToCart: (product: Product) => void;
  isSelected: boolean;
}

export default function ProdutosCard({ title, price, description, image, rating, addItemToCart, isSelected }: ProductProps) {
  return <article className={`max-w-sm border border-gray-200 rounded-lg p-4 ${isSelected ? 'bg-blue-100' : 'bg-white'} mb-6`}>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <img
      src={image}
      alt="Imagem do produto"
      className="w-full h-40 object-contain rounded-md mb-4"
    />
    <h4 className="text-lg font-semibold text-blue-600 mb-2">Preço: {price.toFixed(2)}€</h4>
    <p className={`rounded-md ${isSelected ? 'bg-white' : 'bg-gray-100'} text-sm text-gray-600`}>{description}</p>
    <h5 className="text-sm text-blue-500">Rating: {rating.rate} Estrelas - {rating.count} Avaliações</h5>
    <button 
      className="bg-blue-400 rounded-md"
      onClick={() => addItemToCart}
      >
        {isSelected ? "- Remover do Cesto" : "+ Adicionar ao Cesto"}
    </button>
  </article>
}
