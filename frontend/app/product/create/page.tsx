"use client"

import React, { useState, useEffect } from "react"
import api from "@/service/api"
import Image from "next/image"

export default function RegisterProduct() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        if (!file) {
            alert('Selecione uma imagem primeiro!')
            return
        }

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("imageUrl", file)

        try {
            const response = await api.post("/product/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })

            alert('Produto cadastrado com sucesso!')

            console.log('Produto cadastrado com sucesso!', response.data);

        } catch (error) {
            console.log('Erro no cadastro:', error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')

        if (!token) {
            alert('Você não está logado.')
            window.location.href = '/login'
        } else {
            if (role !== 'admin') {
                alert('Você não tem autorização para acessar essa página.')
                window.location.href = '/'
            }
        }
    })

    return (
        <section className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="w-fit my-10">
                <div className="mb-5">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Painel Administrativo
                    </h1>
                    <p className="text-gray-500">
                        Cadastre Produtos para a loja online
                    </p>
                </div>

                <div className="outline-2 rounded-2xl p-5 mb-5">
                    <div className="mb-5">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold text-gray-800">
                                    <span className="px-2 mr-4 bg-gray-300 rounded-lg">
                                        1
                                    </span>
                                    <span>
                                        Upload de Imagem
                                    </span>
                                </h1>

                                <p className="text-gray-500">
                                    Adicione Imagens do Produto
                                </p>
                            </div>

                            <label
                                htmlFor="image"
                                className="cursor-pointer px-4 py-2 h-10 w-fit bg-blue-600 hover:bg-blue-800 text-white rounded-md"
                            >
                                Selecionar arquivo
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <input id="image" className="bg-gray-200" hidden placeholder="" type="file" accept="image/*" onChange={handleFileChange}></input>
                            {previewImage &&
                                <Image className="rounded-xl" src={previewImage} width={300} height={300} alt="preview" />
                            }
                        </div>
                        {file && <p className="mt-2 text-sm">{file?.name}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-5 outline-2 rounded-2xl p-5">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            <span className="px-2 mr-4 bg-gray-300 rounded-lg">
                                2
                            </span>
                            <span>
                                Informações do Produto
                            </span>
                        </h1>
                        <p className="text-gray-500">
                            Preencha os campos abaixo com as informações básicas do produto
                        </p>
                    </div>

                    <div className="flex flex-row justify-between gap-3">
                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium" htmlFor="">NOME</label>
                            <input type="text"
                                placeholder="Digite o nome do produto"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                className="outline-1 rounded-lg outline-gray-500 px-4 py-1 mt-1"
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium" htmlFor="">PREÇO</label>
                            <input type="text"
                                placeholder="0,00"
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}
                                className="outline-1 rounded-lg outline-gray-500 px-4 py-1 mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium" htmlFor="">DESCRIÇÃO</label>
                            <input type="text"
                                placeholder="Descreva seu produto"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                className="outline-1 rounded-lg outline-gray-500 px-4 py-1 mt-1"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-center">
                        <button type="submit" className="text-white font-medium bg-orange-500 rounded-xl px-5 py-2 w-full hover:cursor-pointer hover:bg-amber-900">
                            Cadastrar
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}