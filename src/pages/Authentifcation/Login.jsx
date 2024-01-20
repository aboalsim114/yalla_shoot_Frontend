import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Navbar from "../../composants/Navbar/Navbar";
import './LoginStyle.css';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Veuillez entrer une adresse email valide. Exemple: nom@domaine.com')
        .required('L\'adresse email est requise pour la connexion'),

    password: Yup.string()
        .required('Veuillez entrer votre mot de passe')
});


export default function Login() {
    const [showPassword, setshowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setshowPassword(!showPassword);
    };

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('email', values.email.trim());
        formData.append('password', values.password);

        try {
            const response = await axios({
                method: 'post',
                url: process.env.REACT_APP_API_URL,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Connexion réussie');
            } else {
                console.error('Connexion échouée');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className="login-sidebar">
                    <div className="brand-logo">
                    </div>
                </div>
                <div className="login-form-container">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginFormSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="login-form">
                                <div className="input-wrapper">
                                    <label htmlFor="email">E-mail</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Votre email"

                                    />
                                    {errors.email && touched.email ? (
                                        <div style={{ color: "red" }}>{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="password">Mot de passe</label>
                                    <div className="password-field">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Votre mot de passe"
                                        />
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </div>
                                    {errors.password && touched.password ? (
                                        <div style={{ color: "red" }}>{errors.password}</div>
                                    ) : null}
                                </div>
                                <button type="submit" className="login-btn">Se connecter</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
