import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Box, Typography, ToggleButtonGroup, ToggleButton, Autocomplete, TextField,
    Button, Container, Grid, Card, CardContent, CardMedia, CardActionArea
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FootballIcon from '@mui/icons-material/SportsSoccer';
import BasketballIcon from '@mui/icons-material/SportsBasketball';
import CardGameIcon from '@mui/icons-material/Casino';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "../../composants/Navbar/Navbar";
import axios from 'axios';
import CardEquipe from '../../composants/DashboardUser/CardEquipe';

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

    const handleSearchGame = async (values, { setSubmitting }) => {
        const { sport, location } = values;


        try {
            const response = await axios.get(`http://localhost:8888/api/player/gamesBy/${location}/${sport}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            });
            if (response.status === 200) {
                setSearchResults(response.data);
                console.log(response.data);
            } else {
                console.error("Erreur lors de la récupération des jeux :", response.statusText);
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des jeux :", error);
            setSearchResults([]);
        } finally {
            setSubmitting(false);
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
                        onSubmit={handleSearchGame}
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
                                                <ToggleButton value="FOOT" aria-label="FOOT">
                                                    <FootballIcon /> Football
                                                </ToggleButton>
                                                <ToggleButton value="BASKET" aria-label="Basketball">
                                                    <BasketballIcon /> Basketball
                                                </ToggleButton>
                                                <ToggleButton value="TENNIS" aria-label="TENNIS">
                                                    <CardGameIcon /> TENNIS
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                            {errors.sport && touched.sport && <div style={{ color: "red" }}>{errors.sport}</div>}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Autocomplete
                                                freeSolo
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
                                    <CardEquipe team={team} gameId={team.id} />
                                </Grid>
                            ))}
                        </Grid>

                    </Box>
                </Container>
            </Box>
        </>
    );
}
