"use client"

import Image from "next/image"
import api from "@/service/api"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export default function ProductInfo() {
    const params = useParams()
    const productId = params.id
    const [product, setProduct] = useState<Product>()
    const [quantity, setQuantity] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    async function getProdInfo() {
        try {
            const response = await api.get(`/product/get/${productId}`)
            console.log('Response', response.data);

            setProduct(response.data.prod)
        } catch (error) {
            console.log('Erro ao buscar informações do back.', error);
        }
    }

    useEffect(() => {
        const role = localStorage.getItem('role')

        if (role === 'admin') {
            setIsAdmin(true)
        } 
    }, [])

    useEffect(() => {
        getProdInfo()
    }, [])

    const handleDeleteProduct = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await api.delete(`/product/delete/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log('Response:', response.data);

            alert('Produto deletado com sucesso!')
            window.location.href = '/'
        } catch (error) {
            console.log('Falha ao deletar produto.', error);
        }
    }

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token')

        try {
            const response = await api.post('/cart/add', { productId, qnt: quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log('Response: ', response);

            alert('Item adicionado ao carrinho.')
        } catch (error) {
            console.log('Falha ao adicionar item ao carrinho.', error);
        }
    }

    return (
        <section className="bg-amber-300 h-full">
            <div className="m-auto max-w-7xl text-white">
                <div className="w-full">
                    <div className="flex flex-row justify-between">
                        <div className="object-contain">
                            <Image className="m-auto max-50 p-10 object-contain" src={`http://localhost:3001/uploads/${product?.imageUrl}`} width={600} height={600} alt="produto" />
                        </div>

                        <div className="flex flex-col gap-4 bg-gradient-to-r from-gray-900 to-gray-700 p-10 w-1/2 m-auto rounded-2xl">
                            <h1 className="font-medium text-6xl">{product?.name}</h1>
                            <p>Frete Grátis para compras até R$ 60,00</p>
                            <h2 className="font-medium text-4xl">R$ {product?.price.toFixed(2)}</h2>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex justify-center items-center gap-3 bg-gray-900 p-2 rounded-xl">
                                    <label htmlFor="quantity"
                                        className="text-lg"
                                    >
                                        Quantidade:
                                    </label>
                                    <input id="quantity"
                                        min={0}
                                        placeholder="0"
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                        className="outline-1 w-20 rounded-lg pl-4 py-0.5" type="number"
                                    />

                                    <button onClick={() => { handleAddToCart() }} className="bg-orange-600 px-4 py-1 rounded-lg hover:bg-orange-800 hover:cursor-pointer">Adicionar ao carrinho</button>
                                </div>
                            </div>
                            <p>{product?.description}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nam dolor earum, deserunt, quisquam qui tempore iusto cupiditate libero eaque ex dignissimos saepe architecto alias voluptatibus, sequi sed iure? Laborum.</p>

                            {isAdmin &&
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => { window.location.href = `http://localhost:3000/product/update/${productId}` }} className="bg-orange-400 py-1 rounded-2xl hover:bg-orange-800 hover:cursor-pointer">Atualizar</button>
                                    <button onClick={() => { handleDeleteProduct() }} className="bg-red-600 py-1 rounded-2xl hover:bg-red-800 hover:cursor-pointer">Deletar</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}