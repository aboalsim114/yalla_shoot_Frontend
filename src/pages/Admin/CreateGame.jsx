import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import Navbar from "../../composants/Navbar/Navbar";
import axios from 'axios';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
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
});

export default function CreateGame() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [formData, setFormData] = useState({
        category: '',
        date: '',
        description: '',
        players_number: '',
        required_players: '',
        city: '',
        latitude: '',
        longitude: '',
        postal_code: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8888/api/organizer/create/game/${id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 200) {
                setOpenSnackbar(true);
                console.log(response.data);
                setTimeout(() => {
                    navigate(`/dashboardOrganizer/${id}`);
                }, 3000)
            } else {
                alert("Erreur lors de la création du jeu:")
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Erreur inconnue lors de la création du jeu';
            alert("Erreur lors de la création du jeu: " + errorMessage);
            console.error("Erreur lors de la création du jeu:", error);
        }
        finally {
            setLoading(false);
        }
    };


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setFormData(prevFormData => ({
                    ...prevFormData,
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
                }));

                try {
                    const response = await axios.get(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${latitude}&lng=${longitude}&username=sabdulhalim`);
                    if (response.data && response.data.postalCodes.length > 0) {
                        const { placeName, postalCode } = response.data.postalCodes[0];
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            city: placeName,
                            postal_code: postalCode
                        }));
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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            error={!!formErrors.description}
                            helperText={formErrors.description}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="players_number"
                            name="players_number"
                            label="Nombre de Joueurs"
                            type="number"
                            value={formData.players_number}
                            onChange={handleChange}
                            error={!!formErrors.players_number}
                            helperText={formErrors.players_number}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="required_players"
                            name="required_players"
                            label="Joueurs Requis"
                            type="number"
                            value={formData.required_players}
                            onChange={handleChange}
                            error={!!formErrors.required_players}
                            helperText={formErrors.required_players}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Catégorie</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                error={!!formErrors.category}
                            >
                                <MenuItem value="FOOT">Football</MenuItem>
                                <MenuItem value="BASKET">Basketball</MenuItem>
                                <MenuItem value="TENNIS">Tennis</MenuItem>
                            </Select>
                            {formErrors.category && <Typography color="error">{formErrors.category}</Typography>}
                        </FormControl>
                        <TextField
                            fullWidth
                            id="date"
                            name="date"
                            label="Date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            error={!!formErrors.date}
                            helperText={formErrors.date}
                        />
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="city"
                            value={formData.city}
                            onChange={handleChange}
                            error={!!formErrors.city}
                            helperText={formErrors.city}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="postal_code"
                            name="postal_code"
                            label="Code Postal"
                            value={formData.postal_code}
                            onChange={handleChange}
                            error={!!formErrors.postal_code}
                            helperText={formErrors.postal_code}
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Créer"}
                        </Button>
                    </form>
                </Box>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    ton jeu  a été crée avec succès!
                </MuiAlert>
            </Snackbar>
        </>
    );
}
