import React from 'react';
import tecnologiasData from '@/app/data/tecnologias.json';
import TecnologiasCard from '@/components/TecnologiasCard';
import { Tecnologia } from '@/models/interfaces';

export default function TecnologiasPage() {
  const tecnologias: Tecnologia[] = tecnologiasData;

  return <>
    { tecnologias.map( t => (
      <TecnologiasCard
        key={t.id}
        id={t.id}
        title={t.title}
        price={t.price}
        description={t.description}
        category={t.category}
        image={t.image}
        rating={t.rating}
      />
    ))}
  </>
}