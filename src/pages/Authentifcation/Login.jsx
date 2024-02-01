import React, { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Navbar from "../../composants/Navbar/Navbar";
import './LoginStyle.css';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Veuillez entrer une adresse email valide. Exemple: nom@domaine.com')
        .required('L\'adresse email est requise pour la connexion'),

    password: Yup.string()
        .required('Veuillez entrer votre mot de passe')
});


export default function Login() {
    const [showPassword, setshowPassword] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const { updateToken, updateUserId } = useContext(AuthContext);




    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };



    const togglePasswordVisibility = () => {
        setshowPassword(!showPassword);
    };

    const handleSubmit = async (values) => {
        const data = { email: values.email.trim(), password: values.password };

        try {
            const response = await axios.post("http://localhost:8888/api/v1/auth/authenticate", data);


            if (response.status === 200 && response.data.token) {
                updateToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);

                if (response.data.id) {
                    updateUserId(response.data.id);
                    localStorage.setItem("id", response.data.id);
                }
                setOpenSnackbar(true);
                if (response.data.role === 'ROLE_PLAYER') {
                    setTimeout(() => navigate(`/DashboardUser/${response.data.id}`), 3000);

                }

                else if (response.data.role === 'ROLE_ADMIN') {
                    setOpenSnackbar(true);
                    setTimeout(() => navigate(`/DashboardAdmin/${response.data.id}`), 3000);
                }

                else if (response.data.role === 'ROLE_ORGANIZER') {
                    setOpenSnackbar(true);
                    setTimeout(() => navigate(`/DashboardOrganizer/${response.data.id}`), 3000);
                }



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
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Utilisateur bien connecté  !
                </MuiAlert>
            </Snackbar>
        </>
    );
}
