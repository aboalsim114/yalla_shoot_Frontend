import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Autocomplete, TextField, Button, Container, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FootballIcon from '@mui/icons-material/SportsSoccer';
import BasketballIcon from '@mui/icons-material/SportsBasketball';
import CardGameIcon from '@mui/icons-material/Casino';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "../../composants/Navbar/Navbar";
import axios from 'axios';
import CardEquipe from '../../composants/DashboardUser/CardEquipe';
import { Link } from 'react-router-dom';

const SearchSchema = Yup.object().shape({
    sport: Yup.string().required('Le choix d\'un sport est obligatoire'),
    location: Yup.string().required('La saisie d\'un emplacement est obligatoire'),
});

export default function RechercheGame() {
    const [suggestions, setSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const handleLocationInputChange = async (event, newInputValue, setFieldValue) => {
        setFieldValue("location", newInputValue);
        if (newInputValue.length > 2) {
            try {
                const response = await axios.get(`http://api.geonames.org/searchJSON?q=${newInputValue}&maxRows=10&country=FR&username=sabdulhalim`);
                setSuggestions(response.data.geonames.map(city => city.name));
            } catch (error) {
                console.error("Erreur lors de la récupération des suggestions de villes", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ width: '100%', minHeight: '100vh' }}>
                <Container maxWidth="lg" sx={{ py: 5 }}>
                    <Typography variant="h3" sx={{ mb: 5, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
                        Recherche un Jeu
                    </Typography>

                    <Formik
                        initialValues={{ sport: '', location: '' }}
                        validationSchema={SearchSchema}
                        onSubmit={(values) => {
                            console.log('Recherche d’équipes pour:', values.sport, 'à', values.location);
                            const results = [
                                { name: 'Équipe A', location: 'Paris', sport: 'Football', imageUrl: 'https://files.oaiusercontent.com/file-iu9tu3iN4oJ7LWxhJ4DkGJo6?se=2024-01-18T16%3A01%3A10Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D6171f7ad-4746-4189-906e-277171b0364d.webp&sig=ePRDb6KXWFB8MvIHdiuBcy3G7LofJh3rodCtacqqQdw%3D' },
                                { name: 'Équipe B', location: 'Lyon', sport: 'Basketball', imageUrl: 'https://files.oaiusercontent.com/file-h606Ddy05bw6JWjSOmunGOiG?se=2024-01-18T16%3A41%3A44Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D4a591fdf-fe5e-4da0-98e7-0ffd759ce7e2.webp&sig=fekbR84EwQUjxuIPvIrdw5IaAfAFkDgFh5pNcBzFZSk%3D' },

                            ];
                            setSearchResults(results);
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                            <Form>
                                <Card elevation={3} sx={{ mb: 4, padding: 3, borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <ToggleButtonGroup
                                                value={values.sport}
                                                exclusive
                                                onChange={(e, newSport) => setFieldValue("sport", newSport)}
                                                aria-label="Sport selection"
                                                fullWidth
                                            >
                                                <ToggleButton value="football" aria-label="Football">
                                                    <FootballIcon /> Football
                                                </ToggleButton>
                                                <ToggleButton value="basketball" aria-label="Basketball">
                                                    <BasketballIcon /> Basketball
                                                </ToggleButton>
                                                <ToggleButton value="cartes" aria-label="Tennis">
                                                    <CardGameIcon /> Tennis
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                            {errors.sport && touched.sport && <div style={{ color: "red" }}>{errors.sport}</div>}
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Autocomplete

                                                options={suggestions}
                                                onInputChange={(event, newInputValue) => handleLocationInputChange(event, newInputValue, setFieldValue)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Emplacement géographique" fullWidth InputProps={{ ...params.InputProps, startAdornment: <LocationOnIcon /> }} />
                                                )}
                                            />
                                            {errors.location && touched.location && <div style={{ color: "red" }}>{errors.location}</div>}
                                        </Grid>
                                    </Grid>

                                    <Button type="submit" variant="contained" startIcon={<SearchIcon />} fullWidth sx={{ bgcolor: "#1976d2", '&:hover': { bgcolor: '#115293' }, mt: 2 }}>
                                        Rechercher
                                    </Button>
                                </Card>
                            </Form>
                        )}
                    </Formik>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>Résultats de recherche :</Typography>
                        <Grid container spacing={2}>
                            {searchResults.map((team, index) => (
                                <Grid item xs={12} md={6} lg={4} key={index}>
                                    <CardEquipe team={team} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
