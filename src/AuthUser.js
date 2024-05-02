import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
export default function AuthUser(){
    const getToken=()=>{
        const getTokenStorage=localStorage.getItem('token');
        return JSON.parse(getTokenStorage)
    }
    const getUser=()=>{
        const getUSerStorage=localStorage.getItem('user');
        return JSON.parse(getUSerStorage)
    }
    const [token,setToken]=useState(getToken());
    const [user,setUser]=useState(getUser());
    const navigate=useNavigate();
    const saveToken=(user,token,expirationInMinutes)=>{
        localStorage.setItem('token',JSON.stringify(token));
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('expirationInMinutes',JSON.stringify(expirationInMinutes));
        setToken(token);
        setUser(user);
        navigate('/dashboard')
    }
    const logout=()=>{
        localStorage.clear();
    }
   

    const http=axios.create({
        baseURL:"http://localhost:8000/api",
        // baseURL:"http://192.168.1.84:8000/api",
        headers:{
            // "Content-Type":'application/json',
            "Content-Type": "multipart/form-data",
            'Authorization':`Bearer ${token}`,
        }
    });

    // for expired login 
    const checkExpiration = () => {
        const expirationDate = localStorage.getItem('expirationDate');
        if (expirationDate) {
            const currentDate = new Date();
            const expired = new Date(expirationDate) < currentDate;
            if (expired) {
                localStorage.clear();
                console.log('LocalStorage cleared due to expiration.');
            }
        }
    };
    return {
        setAuthToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}