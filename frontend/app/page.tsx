"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '../service/api.js';

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
}

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');	

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await api.get('/product/get-all');
				console.log('RESPONSE: ', response.data);
				setProducts(response.data.prod);

			} catch (error) {
				console.error('Erro ao buscar produtos:', error);
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
		<div className='max-w-fit mx-auto my-10 px-40 py-5'>
			<section className="rounded-xl pt-5 bg-[url('/bc1.jpg')] bg-cover">
				<div className="mx-auto gap-100 flex justify-center">
					<div className="content-center">
						<h2 className="text-4xl font-bold tracking-tight">Bem vindo a UX-Commerce</h2>
						<p className="text-neutral-600">Descubra os melhores produtos pelos melhores preços</p>
					</div>
					<div>
						<Image alt="perfume" src="/perfume.png" width={300} height={300} />
					</div>
				</div>
			</section>

			<section className="mt-10 px-4">
				<h3 className="text-2xl font-bold mb-6 text-center">Nossos Produtos</h3>
				<div className="grid grid-cols-6 gap-6">
					{products.length > 0 ? (
						products.map(product => (
							<div key={product.id}
							onClick={() => { window.location.href = `/product/${product.id}` }}
								className="bg-white rounded-lg outline-1 outline-gray-200 shadow-lg p-4 flex flex-col items-center hover:cursor-pointer hover:shadow-2xl"
							>
								<Image
									src={`http://localhost:3001/uploads/${product.imageUrl}`}
									width={300} height={300} alt={product.name}
									className="w-full max-h-50 object-contain rounded-md mb-4"
								/>
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