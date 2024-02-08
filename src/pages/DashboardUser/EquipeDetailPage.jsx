import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Card, CardContent, CardHeader, Avatar, Paper,
    List, ListItem, ListItemText, Divider, useMediaQuery, useTheme, Button
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Navbar from '../../composants/Navbar/Navbar';
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
export default function EquipeDetailPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams()
    const [gameInfo, setGameInfo] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [DemandeInprogess, setDemandeInProgress] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const fetchGameInfo = async () => {
        try {
            const url = `http://localhost:8888/api/player/game/${id}`;
            const response = await axios.get(url, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 200) {
                setGameInfo(response.data);

            }


        }
        catch (error) {
            console.error("Erreur lors de la récupération des informations de l'équipe:", error);
        }
    }


    useEffect(() => {
        fetchGameInfo()
    }, [])



    const sendJoinRequest = async () => {
        const playerId = localStorage.getItem('id');
        const requestPayload = { note: "Je souhaite rejoindre cette équipe." };

        try {
            const response = await axios.post(`http://localhost:8888/api/player/sendRequest/${id}/${playerId}`, requestPayload, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 200) {
                console.log(response.data);
                setDemandeInProgress(response.data.inProgress);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la demande:", error);
        }
    };




    return (
        <>
            <Navbar />
            <Box sx={{ p: 4, minHeight: '100vh' }}>
                <Paper elevation={4} sx={{ p: 3, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#2196F3' }}>
                    <Avatar sx={{ width: isMobile ? 80 : 120, height: isMobile ? 80 : 120, backgroundColor: '#fff', color: '#2196F3' }}>
                        <SportsEsportsIcon sx={{ fontSize: isMobile ? 60 : 80 }} />
                    </Avatar>
                    <Typography variant={isMobile ? "h6" : "h4"} sx={{ fontWeight: 'bold', color: '#fff', mt: 2 }}>

                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        {gameInfo.category} - {gameInfo.city + " " + gameInfo.postalCode}
                    </Typography>
                </Paper>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardHeader title="Description de l'équipe" sx={{ backgroundColor: '#2196F3', color: '#fff' }} />
                            <CardContent>
                                <Typography variant="body1">
                                    {gameInfo.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardHeader title="Joueurs inscrits" sx={{ backgroundColor: '#2196F3', color: '#fff' }} />
                            <List>
                                <React.Fragment >
                                    <ListItem>
                                        <Avatar><PeopleOutlineIcon />{gameInfo.registredPlayers}</Avatar>

                                    </ListItem>

                                </React.Fragment>
                            </List>
                        </Card>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardHeader title="Joueurs manquants" sx={{ backgroundColor: '#2196F3', color: '#fff' }} />
                            <List>
                                <React.Fragment >
                                    <ListItem>
                                        <Avatar><PeopleOutlineIcon />{gameInfo.requiredPlayers}</Avatar>
                                    </ListItem>
                                </React.Fragment>
                            </List>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardHeader title="Rejoindre l'Équipe" sx={{ backgroundColor: '#9D2026', color: '#fff' }} />
                            <CardContent>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Vous êtes passionné de {gameInfo.category} et cherchez une équipe dynamique ? Rejoignez-nous !
                                </Typography>
                                <Button variant="contained" onClick={sendJoinRequest} disabled={DemandeInprogess} color="primary">
                                    Devenir membre
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    votre demande a été envoyée avec succès!
                </MuiAlert>
            </Snackbar>
        </>
    );
}
