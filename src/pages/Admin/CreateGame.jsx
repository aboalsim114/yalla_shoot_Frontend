import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import Navbar from "../../composants/Navbar/Navbar";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function CreateGame() {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            date: '',
            category: '',
            location: '',
            codePostal: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Le nom du jeu est requis'),
            date: Yup.date().required('La date est requise'),
            category: Yup.string().required('La catégorie est requise'),
            location: Yup.string().required('L’emplacement est requis'),
            codePostal: Yup.string().required('Le code postal est requis')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:8888/api/organizer/create/game', values, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
                });
                console.log("Jeu créé :", response.data);
            } catch (error) {
                console.error("Erreur lors de la création du jeu :", error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4">Créer un Jeu</Typography>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: 3 }}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Nom du Jeu"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            margin="normal"
                        />
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
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            id="category"
                            name="category"
                            label="Catégorie"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="location"
                            name="location"
                            label="Emplacement"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="codePostal"
                            name="codePostal"
                            label="Code Postal"
                            value={formik.values.codePostal}
                            onChange={formik.handleChange}
                            error={formik.touched.codePostal && Boolean(formik.errors.codePostal)}
                            helperText={formik.touched.codePostal && formik.errors.codePostal}
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
                    </form>
                </Box>
            </Container>
        </>
    );
}
