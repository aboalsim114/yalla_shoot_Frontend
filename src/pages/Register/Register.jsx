import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, InputAdornment, Snackbar, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './RegisterStyle.css';
import Navbar from "../../composants/Navbar/Navbar";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';
// Schéma de validation avec Yup
const RegisterSchema = Yup.object().shape({
    firstname: Yup.string().required('Veuillez entrer votre prénom.'),
    lastname: Yup.string().required('Veuillez entrer votre nom.'),
    age: Yup.number()
        .positive("L'âge doit être un nombre positif.")
        .integer("L'âge doit être un nombre entier.")
        .required("Veuillez indiquer votre âge."),
    email: Yup.string()
        .email("L'adresse e-mail semble invalide. Veuillez vérifier.")
        .required("Veuillez entrer une adresse e-mail."),
    motDePasse: Yup.string()
        .required('Veuillez créer un mot de passe.')
        .min(8, 'Le mot de passe doit comporter au moins 8 caractères.'),
    confirmerMotDePasse: Yup.string()
        .oneOf([Yup.ref('motDePasse'), null], 'Les mots de passe ne correspondent pas. Veuillez réessayer.')
        .required('Veuillez confirmer votre mot de passe.'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Le numéro de téléphone doit contenir uniquement des chiffres.')
        .required('Veuillez entrer votre numéro de téléphone.'),
    profilePicture: Yup.mixed()
        .required("Une photo de profil est requise.")
});


export default function Register() {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);



    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    const handleSubmit = async (formValues, { setSubmitting }) => {
        try {
            const data = {
                firstName: formValues.firstname,
                lastName: formValues.lastname,
                age: formValues.age,
                email: formValues.email,
                password: formValues.motDePasse,
                phone: formValues.phone,
                profile_picture: profilePicture,
            };

            let url = 'http://localhost:8888/api/v1/auth/player/register';
            const response = await axios.post(url, data);

            if (response.status === 200) {
                setOpenSnackbar(true);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                console.error('Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
        } finally {
            setSubmitting(false);
        }
    };



    const handleImageChange = (event) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            setProfilePicture(event.currentTarget.files[0]);
        }
    };


    return (
        <>
            <Navbar />
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                marginTop: '50px',
                '@media (max-width: 600px)': {
                    flexDirection: 'column',
                    height: 'auto',
                }
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '90%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 5,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    '@media (max-width: 600px)': {
                        flexDirection: 'column',
                        height: 'auto',
                        overflowY: 'hidden',
                    }
                }}>
                    {/* Côté gauche avec le message */}
                    <Box sx={{
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'primary.dark',
                        color: 'common.white',
                        backgroundImage: 'url(https://files.oaiusercontent.com/file-gY5qp2kiXAUbcneEsLW30vbs?se=2024-01-17T20%3A47%3A36Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D82b2f544-f447-4657-af04-449a2514519e.webp&sig=fPgnyXMHMlTZ6C/ZTLrc5eYBIytIRhPABxRhCYEiuqk%3D)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        p: 4,
                        '@media (max-width: 600px)': {
                            width: '100%',
                            order: 2,
                        }
                    }}>
                        {/* Contenu du côté gauche */}
                    </Box>

                    {/* Côté droit avec le formulaire */}
                    <Box sx={{
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 4,
                        '@media (max-width: 600px)': {
                            width: '100%',
                            order: 1,
                        }
                    }}>
                        <Formik
                            initialValues={{
                                firstname: '',
                                lastname: '',
                                age: '',
                                email: '',
                                motDePasse: '',
                                confirmerMotDePasse: '',
                                phone: '',
                            }}
                            validationSchema={RegisterSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form className="form">
                                    <Field as={TextField}
                                        label="Prénom"
                                        name="firstname"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={touched.firstname ? errors.firstname : ""}
                                        error={touched.firstname && Boolean(errors.firstname)}
                                    />
                                    <Field as={TextField}
                                        label="Nom"
                                        name="lastname"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={touched.lastname ? errors.lastname : ""}
                                        error={touched.lastname && Boolean(errors.lastname)}
                                    />
                                    <Field as={TextField}
                                        label="Âge"
                                        name="age"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText={touched.age ? errors.age : ""}
                                        error={touched.age && Boolean(errors.age)}
                                    />
                                    <Field as={TextField}
                                        label="Email"
                                        name="email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={touched.email ? errors.email : ""}
                                        error={touched.email && Boolean(errors.email)}
                                    />
                                    <Field as={TextField}
                                        label="Mot de Passe"
                                        name="motDePasse"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={touched.motDePasse ? errors.motDePasse : ""}
                                        error={touched.motDePasse && Boolean(errors.motDePasse)}
                                    />
                                    <Field as={TextField}
                                        label="Confirmer Mot de Passe"
                                        name="confirmerMotDePasse"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={touched.confirmerMotDePasse ? errors.confirmerMotDePasse : ""}
                                        error={touched.confirmerMotDePasse && Boolean(errors.confirmerMotDePasse)}
                                    />
                                    <Field as={TextField}
                                        label="Téléphone"
                                        name="phone"
                                        type="tel"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={touched.phone ? errors.phone : ""}
                                        error={touched.phone && Boolean(errors.phone)}
                                    />

                                    <Box textAlign="center" mt={2}>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="raised-button-file"
                                            multiple
                                            type="file"
                                            onChange={(event) => {
                                                setFieldValue("profilePicture", event.currentTarget.files[0]);
                                                handleImageChange(event);
                                            }}
                                        />
                                        <label htmlFor="raised-button-file">
                                            <Button variant="outlined" component="span" startIcon={<PhotoCamera />}>
                                                Télécharger Image
                                            </Button>
                                        </label>
                                        {touched.profilePicture && errors.profilePicture && (
                                            <Typography color="error">{errors.profilePicture}</Typography>
                                        )}
                                    </Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 2, mb: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
                                    >
                                        S'inscrire
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Utilisateur bien inscrit !
                </MuiAlert>
            </Snackbar>
        </>
    );
}