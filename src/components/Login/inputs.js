// src/components/Login/InputsLogin.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

function InputsLogin() {
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        const { userLogin, userPassword } = values;
        const result = await login(userLogin, userPassword);

        if (result.success) {
            // Redireciona para a página Home
            navigate('/home');
        } else {
            alert(result.message);
        }
    };

    return (
        <Formik
            initialValues={{ userLogin: '', userPassword: '' }}
            onSubmit={handleLogin}
        >
            {() => (
                <Form>
                    <div className='form-group'>
                        <label htmlFor="userLogin">Usuário</label>
                        <Field type="text" name="userLogin" className="form-control" />
                        <ErrorMessage name="userLogin" component="div" className="text-danger" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="userPassword">Senha</label>
                        <Field type="password" name="userPassword" className="form-control" />
                        <ErrorMessage name="userPassword" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                </Form>
            )}
        </Formik>
    );
}

export default InputsLogin;
