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
    const [listDemande, setListDemande] = useState([])
    const [demandStatusData, setDemandStatusData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else {
            fetchUserInfo(token);
            fetchListDemande()
        }
    }, [navigate, id]);



    // À l'intérieur de DashboardUser, après avoir récupéré `listDemande`

    useEffect(() => {
        const statusCounts = listDemande.reduce((acc, demande) => {
            const { accepted, refused } = demande;
            const status = accepted ? 'Acceptée' : refused ? 'Refusée' : 'En attente';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        const graphData = Object.entries(statusCounts).map(([label, value], index) => ({
            id: index,
            value,
            label,
        }));

        setDemandStatusData(graphData);
    }, [listDemande]);



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
            } else {
                console.error('Réponse de l’API non réussie:', response);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l’utilisateur:', error);
        }
    };





    const fetchListDemande = async () => {
        try {
            let url = `http://localhost:8888/api/player/get/request/${id}`;
            const response = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });

            if (response.status === 200) {
                setListDemande(response.data);
                console.log(response.data);
            } else {
                console.error('Réponse de l’API non réussie:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
        }
    };








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
                                {listDemande && listDemande.length > 0 ? (
                                    listDemande.map((demande, index) => (
                                        <CardDemande
                                            key={index}
                                            user={`${demande.player.lastName} ${demande.player.firstName}`}
                                            role="Administrateur"
                                            details={demande.note}
                                            status={demande.accepted ? "Acceptée" : demande.refused ? "Refusée" : "En attente"}
                                        />
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText primary="Aucune demande disponible" />
                                    </ListItem>
                                )}
                            </List>
                        </Card>
                    </Grid>


                    <Grid item xs={12} sm={6} lg={6}>
                        <GraphCard >
                            <PieChart
                                series={[
                                    {
                                        data: demandStatusData.length > 0 ? demandStatusData : [{ id: 0, value: 1, label: "Aucune donnée" }],
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
