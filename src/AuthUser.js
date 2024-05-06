import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
export default function AuthUser(){
    const getToken=()=>{
        const getTokenStorage=localStorage.getItem('token');
        return JSON.parse(getTokenStorage)
    }
    const getUser=()=>{
        const getUSerStorage=localStorage.getItem('user');
        return JSON.parse(getUSerStorage)
    }
    const getPermission=()=>{
        const getPermissionStorage=localStorage.getItem('modulePermission');
        return JSON.parse(getPermissionStorage)
    }
    const [token,setToken]=useState(getToken());
    const [user,setUser]=useState(getUser());
    const [modulePermission,setModulePermission]=useState(getPermission());
    const navigate=useNavigate();
    const saveToken=(user,token,permission)=>{
        localStorage.setItem('token',JSON.stringify(token));
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('modulePermission',JSON.stringify(permission));
        setToken(token);
        setUser(user);
        setModulePermission(permission);
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
   
    http.interceptors.response.use(
        (response) => {
            if (response.status === 200 && response.data.response) {
                return response;
            } else if (response.data.message) {
                if (typeof response.data.message === "object") {
                    Object.values(response.data.message).forEach((errs) => {
                        errs.forEach((err) => {
                            toast.error(err);
                        });
                    });
                } else if (typeof response.data.message === "string") {
                    toast.error(response.data.message);
                }
            }
            // return Promise.reject(response);
            return response;
        },
        (error) => {
            if (error.response && error.response.data.type == 'error' && error.response.data.status === 401) {
                toast.error(error.response.data.message)
                localStorage.clear();
                navigate('/login')
            }else if (error.response && error.response.data.type == 'error' && error.response.data.status === 500) {
                toast.error('Network Error ')
                return response
            } 
             else {
                toast.error(error.message)
                return Promise.reject(error);
            }
        }
    );
   
    return {
        setAuthToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout,
        modulePermission,
    }
}