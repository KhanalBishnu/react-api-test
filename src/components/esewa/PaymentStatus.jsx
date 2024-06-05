// src/components/PaymentResult.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const reference = queryParams.get('reference');

  useEffect(() => {
    window.history.pushState({}, null, '/');

    if (!status || (status === 'success' && !reference)) {
        navigate('/');
    }
    else if(status==="success"){
        toast.success('Your payment was successful')
        navigate('/');
    }
    else if(status!="success"){
        toast.error('Your payment was fail')
        navigate('/');
    }
  }, [status, reference, navigate]);

  if (!status || (status === 'success' && !reference)) {
    return null; //
  }



  return (
    <div>
      {status === 'success' ? (
        <div>
          <h2>Payment Successful</h2>
          <p>Your payment was successful. Reference ID: {reference}</p>
        </div>
      ) : (
        <div>
          <h2>Payment Failed</h2>
          <p>There was an issue with your payment. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
