"use client"

import Image from "next/image"
import { useState } from "react"
import api from "../../service/api.js"
import React, { FormEvent } from 'react';

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')

    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1-$2")
            .slice(0, 14);
    };

    const formatPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    };


    async function registerUser() {
        if (password !== confirmPassword) {
            alert("Senhas Incompatíveis.")
            return
        }

        try {
            const response = await api.post('/user/registration', { name, email, password, role, phone, cpf })

            console.log("Resposta completa do register: ", response.data);

            alert('Cadastro realizado com sucesso!')

            window.location.href = '/login'

        } catch (error) {
            console.error("Erro ao fazer cadastro:", error);
            alert("Erro ao fazer cadastro. Verifique suas credenciais e tente novamente.");
        }
    }

    const handleRegistration = (e: FormEvent) => {
        e.preventDefault()

        if (!localStorage.getItem("token")) {
            registerUser();
        } else {
            alert("Você não pode criar uma conta logado!");
        }
    }

    return (
        <div className="flex flex-row justify-center items-center p-10 h-[80vh] w-screen bg-[url('/bc1.jpg')] bg-cover">
            <div className="flex flex-col justify-center rounded-2xl px-20 py-10 h-full bg-gradient-to-r from-gray-900 to-gray-600 m-0 p-0">
                <div className="mx-auto w-full max-w-sm">
                    <div className="flex items-center justify-center gap-2">
                        <Image src="./vercel.svg" alt="Your Company" width={10} height={10} className="h-10 w-auto" />
                        <h1 className="text-white text-5xl">UX</h1>
                    </div>
                    <hr className="text-white" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Crie sua conta!</h2>
                </div>

                <div className="mt-10 mx-auto w-full max-w-sm">
                    <form onSubmit={handleRegistration} action="#" method="POST" className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm/6 font-medium text-gray-100">Nome</label>
                            </div>
                            <div className="mt-2">
                                <input id="name"
                                    type="name"
                                    name="name"
                                    required
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
                            </div>
                        </div>

                        <div className="flex flex-row gap-5">
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
                                    <label className="block text-sm/6 font-medium text-gray-100">CPF</label>
                                </div>
                                <div className="mt-2">
                                    <input id="cpf"
                                        type="text"
                                        name="cpf"
                                        required
                                        value={cpf}
                                        onChange={(e) => { setCpf(formatCPF(e.target.value)) }}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5">
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
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm/6 font-medium text-gray-100">Confirmar senha</label>
                                </div>
                                <div className="mt-2">
                                    <input id="password"
                                        type="password"
                                        name="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5">
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm/6 font-medium text-gray-100">Tipo</label>
                                </div>
                                <div className="mt-2">
                                    <input id="role"
                                        type="text"
                                        name="role"
                                        required
                                        value={role}
                                        onChange={(e) => { setRole(e.target.value) }}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm/6 font-medium text-gray-100">Telefone</label>
                                </div>
                                <div className="mt-2">
                                    <input id="phone"
                                        type="phone"
                                        name="phone"
                                        required
                                        value={phone}
                                        onChange={(e) => { setPhone(formatPhone(e.target.value)) }}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md hover:cursor-pointer bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400">Cadastrar</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Já possui uma conta?
                        <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300"> Faça Login!</a>
                    </p>
                </div>
            </div>
        </div>
    )
}