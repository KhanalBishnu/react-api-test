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
    const saveToken=(user,token)=>{
        localStorage.setItem('token',JSON.stringify(token));
        localStorage.setItem('user',JSON.stringify(user));
        setToken(token);
        setUser(user);
        navigate('/dashboard')
    }
   

    const http=axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-Type":'application/json'
        }
    });
    return {
        setAuthToken:saveToken,
        token,
        user,
        getToken,
        http
    }
}