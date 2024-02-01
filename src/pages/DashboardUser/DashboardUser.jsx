import React, { useState, useEffect, useContext } from 'react';
import {
    Box, Typography, Grid, Card, CardContent, useTheme, CardHeader,
    IconButton, Tooltip, LinearProgress, Avatar, Stack, List, ListItem, ListItemText, Divider, Paper
} from '@mui/material';
import Navbar from "../../composants/Navbar/Navbar";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PieChart } from '@mui/x-charts/PieChart';
import DataCard from '../../composants/DashboardUser/DataCard';
import GraphCard from '../../composants/DashboardUser/GraphCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import RecentGamesCard from '../../composants/DashboardUser/RecentGamesCard';
import axios from "axios"
import CardDemande from '../../composants/DashboardUser/CardDemande';
export default function DashboardUser() {
    const theme = useTheme();
    const { id } = useParams();
    const [profileUserData, setProfileUserData] = useState([])
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [recentGames, setRecentGames] = useState([]);



    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
            navigate('/login');
        } else {
            fetchUserInfo(token);
        }
    }, [navigate, id, token]);


    useEffect(() => {
        const fetchRecentGames = async () => {
            try {
                const response = await axios.get('http://localhost:8888/api/player/games', {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setRecentGames(response.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des matchs:", error);
            }
        };

        fetchRecentGames();
    }, [token]);



    const fetchUserInfo = async (token) => {
        try {
            const url = `http://localhost:8888/api/player/user/${id}`;
            const response = await axios.get(url, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.status === 200) {
                setProfileUserData(response.data);
                console.log(profileUserData);
            } else {
                console.error('Réponse de l’API non réussie:', response);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l’utilisateur:', error);
        }
    };












    const calorieData = [
        { id: 0, value: 500, label: 'Football' },
        { id: 1, value: 300, label: 'Basketball' },
        { id: 2, value: 200, label: 'Tennis' },
    ];


    return (
        <>
            <Navbar />
            <Box sx={{ p: theme.spacing(4), minHeight: '100vh' }}>

                <Paper elevation={4} sx={{ p: theme.spacing(3), mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 80, height: 80, mr: 2 }} src="/path/to/profilePic.jpg">
                        <AccountCircleIcon sx={{ fontSize: 80 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'medium' }}>{profileUserData.firstName + " " + profileUserData.lastName}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{profileUserData.email}</Typography>
                    </Box>
                </Paper>

                <Grid container spacing={4} justifyContent="center">

                    <Grid item xs={12} sm={6} lg={3}>
                        <Card sx={{ maxHeight: 400, overflow: 'auto' }}>
                            <List>
                                <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                    Liste des Demandes
                                </Typography>
                                <CardDemande user={"sami abdulhalim"} role={"Administrateur"} details={"Je souhaite rejoindre l'équipe de football"} status={"Refusée"} />
                                <CardDemande user={"rayan jerbi"} role={"player"} details={"Je souhaite rejoindre l'équipe de football"} status={"Acceptée"} />
                                <CardDemande user={"jihad Glei"} role={"player"} details={"Je souhaite rejoindre l'équipe de football"} status={"En cours"} />
                            </List>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                        <GraphCard >
                            <PieChart
                                series={[
                                    {
                                        data: calorieData,
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    },
                                ]}
                                height={300}
                            />


                        </GraphCard>

                    </Grid>


                    <Grid item xs={12} sm={6} lg={3}>
                        <RecentGamesCard games={recentGames} />
                    </Grid>

                </Grid>


            </Box>
        </>
    );
}
