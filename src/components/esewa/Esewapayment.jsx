// src/components/EsewaPayment.js
import React, { useState } from 'react';
import axios from 'axios';
import AuthUser from '../../AuthUser';

const EsewaPayment = () => {
    const {http}=AuthUser();
    const [amount, setAmount] = useState(200);
    const [referenceId, setReferenceId] = useState('');

    const initiatePayment = async () => {
        try {
            const response = await http.post('/esewa/initiate', {
                amount,
                referenceId,
            });
            console.log(response);

            const { url, params } = response.data.data;
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = url;

            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    const hiddenField = document.createElement('input');
                    hiddenField.type = 'hidden';
                    hiddenField.name = key;
                    hiddenField.value = params[key];
                    form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Payment initiation failed', error);
        }
    };

    return (
        <div>
            <h2>eSewa Payment</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    initiatePayment();
                }}
            >
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
              
                <button type="submit">Pay with eSewa</button>
            </form>
        </div>
    );
};

export default EsewaPayment;