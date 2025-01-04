import React from 'react';
import { Tecnologia } from '@/models/interfaces';

export default function TecnologiasCard({ title, image, description, rating }: Tecnologia) {
  return (
    <article className="w-[300px] border border-gray-200 rounded-lg shadow-md p-4 bg-white mb-6 flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <img
        src={image}
        alt={`Imagem de ${title}`}
        className="w-full max-w-[512px] max-h-[512px] h-40 object-contain rounded-md mb-4"
      />
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <h5 className="text-sm text-blue-500 mb-2">Rating: {rating.rate} Estrelas</h5>
    </article>
  );
}