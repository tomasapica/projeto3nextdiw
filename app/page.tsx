import React from 'react';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">React e Next.js</h1>
      <p className="text-center mb-4">
        Bem-vindo à minha app em React e Next.js,
        das tecnologias Web mais usadas atualmente.
      </p>
      <Image
        src="/react-meme.jpg"
        alt="Meme de React"
        height={500}
        width={750}
        className="rounded-lg"
      ></Image>
    </main>
  );
}