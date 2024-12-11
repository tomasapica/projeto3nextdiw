import React from 'react';
import { Tecnologia } from '@/models/interfaces';

export default function TecnologiasCard({ id, title, image, description, rating }: Tecnologia) {
  return (
    <article className="max-w-sm border border-gray-200 rounded-lg shadow-md p-4 bg-white mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <img
        src={image}
        alt={`Imagem de ${title}`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-blue-500">Rating: {rating} Estrelas</p>
    </article>
  );
}