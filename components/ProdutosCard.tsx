import { Product } from '@/models/interfaces'
import React from 'react'

export default function ProdutosCard({ title, price, description, image, rating }: Product) {
  return (
    <article className="max-w-sm border border-gray-200 rounded-lg shadow-md p-4 bg-white mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <img
        src={image}
        alt="Imagem do produto"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h4 className="text-lg font-semibold text-blue-600 mb-2">Preço: {price.toFixed(2)}€</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <h5 className="">{rating.rate}</h5>
    </article>
  )
}
