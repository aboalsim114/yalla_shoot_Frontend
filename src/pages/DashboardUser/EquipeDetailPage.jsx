import React from 'react';
import {
    Box, Typography, Grid, Card, CardContent, CardHeader, Avatar, Paper,
    List, ListItem, ListItemText, Divider, useMediaQuery, useTheme, Button
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Navbar from '../../composants/Navbar/Navbar';


export default function EquipeDetailPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const equipe = {
        nom: "Les Champions",
        sport: "Football",
        emplacement: "Paris",
        description: "Une équipe passionnée de football avec un esprit de compétition fort. Nous aimons le jeu et cherchons toujours à nous améliorer.",
        membres: ["Alex Dupont", "Sarah Martin", "John Doe", "Emma Durand"],
        palmares: ["Championnat local 2020", "Tournoi régional 2021", "Coupe interclubs 2022"],
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
                        {equipe.nom}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        {equipe.sport} - {equipe.emplacement}
                    </Typography>
                </Paper>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardHeader title="Description de l'équipe" sx={{ backgroundColor: '#2196F3', color: '#fff' }} />
                            <CardContent>
                                <Typography variant="body1">
                                    {equipe.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardHeader title="Membres de l'équipe" sx={{ backgroundColor: '#2196F3', color: '#fff' }} />
                            <List>
                                {equipe.membres.map((membre, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <Avatar><PeopleOutlineIcon /></Avatar>
                                            <ListItemText primary={membre} sx={{ ml: 2 }} />
                                        </ListItem>
                                        {index < equipe.membres.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Card>
                    </Grid>



                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardHeader title="Rejoindre l'Équipe" sx={{ backgroundColor: '#9D2026', color: '#fff' }} />
                            <CardContent>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Vous êtes passionné de football et cherchez une équipe dynamique ? Rejoignez-nous !
                                </Typography>
                                <Button variant="contained" color="primary">
                                    Devenir membre
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
