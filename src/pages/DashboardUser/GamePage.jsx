import React, { useState, useEffect } from 'react';
import Navbar from "../../composants/Navbar/Navbar";
import { Box, Typography, Grid, Card, CardContent, Button, TextField, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import axios from 'axios';

export default function GamePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchGames();
    }, [token]);

    const fetchGames = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8888/api/player/games', { headers: { "Authorization": `Bearer ${token}` } });
            if (response.status === 200) {
                setGames(response.data.map((game, index) => ({ ...game, id: index })));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des jeux:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const params = {
                category: category || undefined,
                date: date || undefined,
                city: city || undefined,
                postalCode: postalCode || undefined,
            };

            const response = await axios.get('http://localhost:8888/api/player/games', {
                params,
                headers: { "Authorization": `Bearer ${token}` }
            });

            setGames(response.data.map((game, index) => ({ ...game, id: index })));
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Nom du Jeu', width: 150 },
        { field: 'date', headerName: 'Date', width: 110 },
        { field: 'category', headerName: 'Catégorie', width: 130 },
        { field: 'organizer', headerName: 'Organisateur', width: 130 },
        { field: 'location', headerName: 'Lieu', width: 130 },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1, p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Jeux Disponibles
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: 'auto' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Filtres de Recherche
                                </Typography>
                                <TextField
                                    label="Chercher par catégorie"
                                    variant="outlined"
                                    fullWidth
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Chercher par date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Chercher par ville"
                                    variant="outlined"
                                    fullWidth
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Chercher par code postal"
                                    variant="outlined"
                                    fullWidth
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleSearch}
                                >
                                    Rechercher
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <div style={{ height: 400, width: '100%' }}>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <DataGrid
                                    rows={games}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
