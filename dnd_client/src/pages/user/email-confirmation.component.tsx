import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RoutesAppApi } from '../../config';
import { AxiosAuth } from '../../core';
const queryString = require("query-string");

const EmailConfirmation = (props: any) => {
    const credential = queryString.parse(props.location.search);
    let history = useHistory();

    const confirmEmail = async (token: string, email: string) => {
        try {
            await AxiosAuth.get(RoutesAppApi.Auth.EmailConfirmation(token, email));
            toast.success("Thank you for email confirmation");
        } catch (error) {
            toast.error("Email confirmation failed")
        }
        setTimeout(() => {
            history.push('/home');
        }, 3000)
    }

    React.useEffect(() => {
        confirmEmail(credential.token, credential.email);
    }, []);

    return (
        <div>
        </div>
    );
};

export default EmailConfirmation;