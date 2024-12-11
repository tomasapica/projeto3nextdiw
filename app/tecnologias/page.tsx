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
        image={t.image}
        description={t.description}
        rating={t.rating}
      />
    ))}
  </>
}