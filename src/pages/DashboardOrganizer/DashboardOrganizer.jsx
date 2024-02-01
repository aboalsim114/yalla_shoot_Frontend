import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, CardActions, Grid, Typography, IconButton, Avatar,
    List, ListItem, ListItemText, Button, Tooltip, useTheme, Chip, Divider
} from '@mui/material';
import Navbar from "../../composants/Navbar/Navbar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function DashboardOrganizer() {
    const theme = useTheme();
    const token = localStorage.getItem('token');
    const [requests, setRequests] = useState([]);
    const [profileUserData, setProfileUserData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchUserInfo();
        }
    }, [navigate, id]);


    const fetchUserInfo = async () => {
        try {
            const url = `http://localhost:8888/api/organizer/user/${id}`;

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






    const handleAcceptRequest = (id) => {

        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: 'Accepté' } : request
            )
        );
    };


    const handleRejectRequest = (id) => {

        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: 'Refusé' } : request
            )
        );
    };





    const pieData = [
        { id: 0, value: 10, label: 'Accepté' },
        { id: 1, value: 15, label: 'Refusée' },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1, p: theme.spacing(3) }}>
                <Grid container spacing={theme.spacing(3)}>
                    <Grid item xs={12} sm={4}>
                        <Card raised sx={{ boxShadow: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                    <Avatar sx={{ bgcolor: "#9D2026", width: 100, height: 100, mb: 2 }}>
                                        {/* Icône ou image */}
                                    </Avatar>
                                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>{profileUserData.firstName + " " + profileUserData.lastName}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary" align="center">{profileUserData.role || "role"} </Typography>
                                </Box>
                            </CardContent>
                            <Divider variant="middle" />
                            <CardActions sx={{ justifyContent: 'center', py: 2 }}>
                                <Button startIcon={<EditIcon />} variant="contained" sx={{ bgcolor: "#9D2026" }} size="large">
                                    Modifier le profil
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>



                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={theme.spacing(2)}>
                            <Grid item xs={12}>
                                <Card raised sx={{ maxHeight: 400, overflow: 'auto', boxShadow: 3, bgcolor: 'background.default', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>Liste des demandes reçues:</Typography>
                                        <List sx={{ py: 1 }}>
                                            {requests.map((request) => (
                                                <React.Fragment key={request.id}>
                                                    <ListItem>
                                                        <ListItemText primary={request.name} secondary={request.details} />
                                                        {!request.status ? (
                                                            <>
                                                                <Tooltip title="Accepter">
                                                                    <IconButton color="success" onClick={() => handleAcceptRequest(request.id)}>
                                                                        <CheckCircleIcon sx={{ fontSize: 'large' }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Refuser">
                                                                    <IconButton color="error" onClick={() => handleRejectRequest(request.id)}>
                                                                        <CancelIcon sx={{ fontSize: 'large' }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </>
                                                        ) : (
                                                            <Chip label={request.status} color={request.status === 'Accepté' ? 'success' : 'error'} sx={{ ml: 2 }} />
                                                        )}
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </React.Fragment>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>



                            <Grid item xs={12}>
                                <Card raised sx={{ boxShadow: 5, borderRadius: theme.shape.borderRadius }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Statistiques</Typography>
                                        <Box sx={{ m: 2 }}>
                                            <PieChart
                                                colors={['#5cb85c', '#d9534f']}
                                                series={[
                                                    {
                                                        data: pieData,
                                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                                    },
                                                ]}
                                                height={200}
                                            />
                                        </Box>
                                        {/* Ajouter ici les légendes */}
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}