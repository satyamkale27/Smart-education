"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'

import { useRouter } from 'next/navigation';
import { useAuthContext } from '../components/AuthWrapper'
import { API } from '../../config'

const Login = () => {
	const { setAuth } = useAuthContext()
	const [login, setLogin] = useState({
		email: "div@gmail.com",
		password: "divyansh"
	})
	const router = useRouter()

	const sendData = async (e) => {
		e.preventDefault()
		if (!login.email || !login.password) {
			return
		}
		try {
			const data = { email: login.email, password: login.password }
			const res = await axios.post(`${API}/login`, data)
			console.log(res.data)
			if (res.data.success) {
				Cookies.set("access_token", res.data.access_token)
				Cookies.set("refresh_token", res.data.refresh_token)
				setAuth(true)
				router.push("/")
			}

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form onSubmit={sendData} className="space-y-4 md:space-y-6" action="#">
							<div>
								<label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
								<input value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
							</div>
							<div>
								<label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
								<input value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
							</div>

							<button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600">Sign in</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don't have an account yet? <Link href={"/signup"} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login