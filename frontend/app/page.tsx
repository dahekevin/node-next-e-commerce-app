"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from './service/api.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get(`/products?page=1`);
        setProducts(response.data.products);

		console.log('reponse: ', response.data);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="rounded-xl bg-neutral-200 py-8">
        <div className="mx-auto gap-100 flex justify-center">
          <div className="content-center">
            <h2 className="text-4xl font-bold tracking-tight">Bem vindo ao meu E-Commerce</h2>
            <p className="text-neutral-600">Descubra os melhores produtos pelos melhores preços</p>
          </div>
          <div>
            <Image alt="perfume" src="/perfume.png" width={500} height={500} />
          </div>
        </div>
      </section>

      <section className="mt-10 px-4">
        <h3 className="text-2xl font-bold mb-6 text-center">Nossos Produtos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.page} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                <p className="text-neutral-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600">R$ {product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-neutral-500 col-span-full">Nenhum produto encontrado.</p>
          )}
        </div>
      </section>
    </div>
  );
}