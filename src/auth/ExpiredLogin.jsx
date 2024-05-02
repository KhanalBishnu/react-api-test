import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ExpiredLogin() {
    const navigate=useNavigate()
    useEffect(() => {
        // Function to check if the expiration date is less than the current date
        const checkExpiration = () => {
            const expirationInMinutes = localStorage.getItem('expirationInMinutes');
            if (expirationInMinutes) {
              const expirationDate = new Date(parseInt(expirationInMinutes));
              const currentDate = new Date();
              const expired = expirationDate < currentDate;
              if (expired) {
                // toast.error('Expired time');
                  localStorage.clear();
                  console.log('LocalStorage cleared due to expiration.');
                  navigate('/login')
                  
              }
            }
        };
        // Call the function to check expiration on every component render
        checkExpiration();
    }, []);
  return (
    <></>
  )
}

export default ExpiredLogin