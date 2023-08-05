'use client'
import React, { useState } from 'react';
import { useFetch } from '@/app/hooks/useFetch';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useGeneralContext } from '@/app/context/GeneralContext';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context/AuthContext';

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useGeneralContext()
    const router = useRouter()
    const { dispatch } = useAuthContext()

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
            // "Authorization": `Bearer ${Cookies.get('refreshToken')}`
        const loginData = { email, password}
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', loginData, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('refreshToken')}`
                }
            })
            const data = response?.data;
            setUser(data)
            console.log(data);
            if(data?.status === 'success'){
                localStorage.setItem('userData', JSON.stringify(data.data))
                dispatch({type: 'LOGIN', payload: data.data})
                router.push('/get-started/landing')
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };

return (
    <form
        onSubmit={handleFormSubmit}
        className="flex items-center justify-center w-full h-screen overflow-x-hidden overflow-y-auto"
    >
    <div className="flex-col w-[500px] flex justify-center items-center gap-4">
        <div className="w-40 h-16">
        <img src="/images/logo.png" className="object-contain" alt="Logo" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-wide">Let’s find your team</h1>
        <p className="font-medium tracking-tighter text-md">We suggest using the email address you use at work.</p>
        <div className="flex flex-col items-center justify-center w-full gap-5">
        <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[75%] outline-none border border-gray-400 h-10 flex items-center justify-center p-2 rounded-sm"
            placeholder="name@work-email.com"
        />
        <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[75%] outline-none border border-gray-400 h-10 flex items-center justify-center p-2 rounded-sm"
            placeholder="password"
        />
        </div>
        <button
            // onClick={handleFormSubmit}
            type="submit"
            className="mt-5 cursor-pointer flex rounded-sm text-white bg-[#3f1b3f] justify-center items-center h-10 w-[75%]"
        >
        Continue With Email
        </button>
    </div>
    </form>
);
};

export default Page;
