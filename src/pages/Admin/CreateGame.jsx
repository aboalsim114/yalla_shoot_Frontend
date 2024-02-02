import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Navbar from "../../composants/Navbar/Navbar";
import axios from 'axios';
import { useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';


const CreateGameFormSchema = Yup.object().shape({
    category: Yup.string().required('La catégorie est requise'),
    date: Yup.date().required('La date est requise').nullable(),
    description: Yup.string().required('La description est requise'),
    players_number: Yup.number().min(1, 'Doit être au moins 1').required('Le nombre de joueurs est requis'),
    required_players: Yup.number().min(1, 'Doit être au moins 1').required('Le nombre de joueurs requis est requis'),
    founder_id: Yup.string().required('L\'ID du fondateur est requis'),
    location_id: Yup.string().required('L\'ID de l\'emplacement est requis'),
    ville: Yup.string().required('La ville est requise'),
    latitude: Yup.number().required('La latitude est requise'),
    longitude: Yup.number().required('La longitude est requise'),
    postal_code: Yup.string().required('Le code postal est requis'),
    city: Yup.string().required('La ville est requise'),
});


export default function CreateGame() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            console.log('Before axios call');
            setLoading(true);
            const response = await axios.patch('http://localhost:8888/api/organizer/create/game', values, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            });

            console.log('After axios call');

            if (response.status === 200) {
                console.log("Jeu créé :", response.data);
            } else {
                console.error("Erreur lors de la création du jeu :", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la création du jeu :", error);
        }
    };


    const formik = useFormik({
        initialValues: {
            category: '',
            date: '',
            description: '',
            players_number: '',
            required_players: '',
            founder_id: '',
            location_id: '',
            ville: '',
            latitude: '',
            longitude: '',
            postal_code: '',
            city: '',
        },
        validationSchema: CreateGameFormSchema,
        onSubmit: handleSubmit
    });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                formik.setFieldValue('latitude', latitude);
                formik.setFieldValue('longitude', longitude);

                try {
                    const response = await axios.get(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${latitude}&lng=${longitude}&username=sabdulhalim`);
                    if (response.data && response.data.postalCodes.length > 0) {
                        const { placeName, postalCode } = response.data.postalCodes[0];
                        formik.setFieldValue('ville', placeName);
                        formik.setFieldValue('postal_code', postalCode);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des données de localisation :", error);
                }
            }, (error) => {
                console.error("Erreur de géolocalisation :", error);
            });
        } else {
            console.error("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4">Créer un Jeu</Typography>
                    <Formik
                        initialValues={{
                            category: '',
                            date: '',
                            description: '',
                            players_number: '',
                            required_players: '',
                            founder_id: '',
                            location_id: '',
                            ville: '',
                            latitude: '',
                            longitude: '',
                            postal_code: '',
                            city: '',
                        }}
                        validationSchema={CreateGameFormSchema}

                    >
                        {({ errors, touched, handleChange, handleBlur, values }) => (

                            <Form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    id="players_number"
                                    name="players_number"
                                    label="Nombre de Joueurs"
                                    type="number"
                                    value={formik.values.players_number}
                                    onChange={formik.handleChange}
                                    error={formik.touched.players_number && Boolean(formik.errors.players_number)}
                                    helperText={formik.touched.players_number && formik.errors.players_number}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    id="required_players"
                                    name="required_players"
                                    label="Joueurs Requis"
                                    type="number"
                                    value={formik.values.required_players}
                                    onChange={formik.handleChange}
                                    error={formik.touched.required_players && Boolean(formik.errors.required_players)}
                                    helperText={formik.touched.required_players && formik.errors.required_players}
                                    margin="normal"
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="category-label">Catégorie</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                    >
                                        <MenuItem value="FOOT">FOOT</MenuItem>
                                        <MenuItem value="BASKET">BASKET</MenuItem>
                                        <MenuItem value="tennis">Tennis</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    id="date"
                                    name="date"
                                    label="Date"
                                    type="date"
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    error={formik.touched.date && Boolean(formik.errors.date)}
                                    helperText={formik.touched.date && formik.errors.date}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />

                                <TextField
                                    fullWidth
                                    id="ville"
                                    name="ville"
                                    label="Ville"
                                    value={formik.values.ville}
                                    onChange={formik.handleChange}
                                    error={formik.touched.ville && Boolean(formik.errors.ville)}
                                    helperText={formik.touched.ville && formik.errors.ville}
                                    margin="normal"
                                />


                                <TextField
                                    fullWidth
                                    id="postal_code"
                                    name="postal_code"
                                    label="Code Postal"
                                    value={formik.values.postal_code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                                    helperText={formik.touched.postal_code && formik.errors.postal_code}
                                    margin="normal"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Création en cours...' : 'Créer Jeu'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </>
    );
}
