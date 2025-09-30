"use client"

import Image from "next/image"
import { useState } from "react"
import api from "../../service/api.js"
import React, { FormEvent } from 'react';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser() {
        try {
            const response = await api.post('/login', { email, password })

            console.log("Resposta completa do login: ", response.data);

            const token = response.data.token
            const role = response.data.role

            localStorage.setItem('token', token)
            localStorage.setItem('role', role)

            console.log('Token armazenado response.data.token: ', token);

            alert('Seja bem vindo ao nosso sistema!')

            window.location.href = '/'

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
        }
    }

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()

        if (!localStorage.getItem("token")) {
            loginUser();
        } else {
            alert("Você já está logado!");
        }
    }

    return (
        <div className="flex flex-row justify-center items-center h-[80vh] w-screen bg-[url('/bc1.jpg')] bg-cover">
            <div className="flex flex-col justify-center w-[900px] rounded-2xl px-6 py-12 h-[500px] bg-gradient-to-r from-gray-900 to-gray-600 m-0 p-0">
                <div className="mx-auto w-full max-w-sm">
                    <div className="flex items-center justify-center gap-2">
                        <Image src="./vercel.svg" alt="Your Company" width={10} height={10} className="h-10 w-auto" />
                        <h1 className="text-white text-5xl">UX</h1>
                    </div>
                    <hr className="text-white" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Acesse sua conta!</h2>
                </div>

                <div className="mt-10 mx-auto w-full max-w-sm">
                    <form onSubmit={handleLogin} action="#" method="POST" className="space-y-6">
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-100">Email</label>
                            <div className="mt-2">
                                <input id="email"
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm/6 font-medium text-gray-100">Senha</label>
                            </div>
                            <div className="mt-2">
                                <input id="password"
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md hover:cursor-pointer bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400">Entrar</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Não possui uma conta?
                        <a href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300"> Cadastre-se!</a>
                    </p>
                </div>
            </div>
        </div>
    )
}