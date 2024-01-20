import React from 'react';
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

export default function DashboardUser() {
    const theme = useTheme();

    const sportsData = {
        Équipes: 128,
        Joueurs: 1024,
        matches: 390,
        MoyDistance: 20
    };

    const calorieData = [
        { id: 0, value: 500, label: 'Football' },
        { id: 1, value: 300, label: 'Basketball' },
        { id: 2, value: 200, label: 'Tennis' },
    ];

    const recentMatches = ['Match 1 vs Team A', 'Match 2 vs Team B', 'Match 3 vs Team C'];
    const EquipeRechercheJoueurs = ['Team A', 'Team B', 'Team C'];

    return (
        <>
            <Navbar />
            <Box sx={{ p: theme.spacing(4), minHeight: '100vh' }}>

                <Paper elevation={4} sx={{ p: theme.spacing(3), mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 80, height: 80, mr: 2 }} src="/path/to/profilePic.jpg">
                        <AccountCircleIcon sx={{ fontSize: 80 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'medium' }}>sami abdulhalim </Typography>
                        <Typography variant="subtitle1" color="textSecondary">sabdulhalim@example.com</Typography>
                    </Box>
                </Paper>

                <Grid container spacing={4} justifyContent="center">
                    {/* Data cards */}
                    <Grid item xs={12} sm={6} lg={3}>
                        <Stack spacing={2}>
                            <DataCard title="Équipes" value={sportsData.Équipes} IconComponent={SportsSoccerIcon} progress={80} />
                            <DataCard title="Matches" value={sportsData.matches} IconComponent={FitnessCenterIcon} progress={60} />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                        <GraphCard title="Calories brûlées par sport">
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
                        <Stack spacing={2}>
                            <DataCard title="Joueurs" value={sportsData.Joueurs} IconComponent={PeopleOutlineIcon} progress={70} />
                            <DataCard title="Moy. Distance (km)" value={sportsData.MoyDistance} IconComponent={LocationOnIcon} progress={50} />
                        </Stack>
                    </Grid>
                </Grid>

                <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.secondary.main }}>
                        Informations supplémentaires
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardHeader title="Matchs récents" />
                                <List>
                                    {recentMatches.map((match, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem>
                                                <ListItemText primary={match} />
                                            </ListItem>
                                            {index < recentMatches.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Card>
                        </Grid>



                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardHeader title="Equipe Recherche Joueurs" />
                                <List>
                                    {EquipeRechercheJoueurs.map((team, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem>
                                                <ListItemText primary={team} />
                                            </ListItem>
                                            {index < EquipeRechercheJoueurs.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
}
