"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/service/api";
import { headers } from "next/headers";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export default function ShowCart() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchProducts() {
        const token = localStorage.getItem('token')

        try {
            const response = await api.get('/cart/get', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('REsponse:', response.data);
            setProducts(response.data.products)
        } catch (error) {
            console.log('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            alert('Faça login para ver seu carrinho de compras.')
            window.location.href = '/login'
            return
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Carregando produtos...</p>
            </div>
        )
    }

    const handleRemoveFromCart = async (prodId: string) => {
        const token = localStorage.getItem('token')

        try {
            const response = await api.delete('/cart/delete', {
                headers: { Authorization: `Bearer ${token}` },
                data: { productId: prodId }
            })

            console.log('Response: ', response);

            alert('Item removido do carrinho.')
            
        } catch (error) {
            console.log('Falha ao remover item do carrinho.', error);
        }

        fetchProducts()
    }

    return (
        <section className="my-15 px-40">
            <h3 className="text-5xl font-bold mb-6 text-center">Seu Carrinho</h3>
            <div className="grid grid-cols-6 gap-6">
                {products.length ? (
                    products.map(product => (
                        <div key={product.id}
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
                            <div className="flex flex-col gap-2 text-white">
                                <button onClick={() => { window.location.href = `/product/${product.id}` }} className="bg-orange-500 w-full rounded-xl px-4 py-1 hover:bg-orange-900 hover:cursor-pointer">Ver Produto</button>
                                <button onClick={() => { handleRemoveFromCart(product.id) }} className="bg-red-500 w-full rounded-xl px-4 py-1 hover:bg-red-900 hover:cursor-pointer">Remover do carrinho</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-neutral-500 col-span-full">Nenhum produto encontrado.</p>
                )}
            </div>
        </section>
    )
}