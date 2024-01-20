import React from 'react';
import { TextField, Button, Typography, Container, Paper, CssBaseline, Grid, MenuItem, Card, CardContent, Avatar, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Navbar from "../../composants/Navbar/Navbar";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const theme = createTheme({
    palette: {
        primary: {
            main: '#009688', // Vert dynamique
        },
        secondary: {
            main: '#f50057', // Rose énergique
        },
    },
    typography: {
        h2: {
            fontSize: '2.4rem',
            fontWeight: 700,
            color: '#424242',
        },
        subtitle1: {
            color: '#757575',
        },
    },
});

const StyledButton = styled(Button)({
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const validationSchema = Yup.object({
    teamName: Yup.string().required('Le nom de l’équipe est requis'),
    sportType: Yup.string().required('Le type de sport est requis'),
    location: Yup.string().required('L’emplacement est requis'),
    skillLevel: Yup.string().required('Le niveau de compétence est requis'),
    playersNeeded: Yup.number().required('Le nombre de joueurs manquants est requis').positive().integer(),
});

export default function CreateTeam() {
    const formik = useFormik({
        initialValues: {
            teamName: '',
            sportType: '',
            location: '',
            skillLevel: '',
            playersNeeded: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Équipe créée :", values);
        },
    });

    const skillLevels = ["Débutant", "Intermédiaire", "Avancé"];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container maxWidth="md" style={{ paddingTop: '40px', paddingBottom: '40px', backgroundSize: 'cover' }}>
                <Box sx={{ padding: '20px', borderRadius: '10px' }}>
                    <CardContent>
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 60, height: 60, margin: '0 auto 20px' }}>
                            <SportsSoccerIcon fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h2" align="center" gutterBottom>
                            Créer une Équipe
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Nom de l'équipe"
                                        name="teamName"
                                        value={formik.values.teamName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.teamName && Boolean(formik.errors.teamName)}
                                        helperText={formik.touched.teamName && formik.errors.teamName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Type de sport"
                                        name="sportType"
                                        value={formik.values.sportType}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.sportType && Boolean(formik.errors.sportType)}
                                        helperText={formik.touched.sportType && formik.errors.sportType}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Emplacement"
                                        name="location"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.location && Boolean(formik.errors.location)}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Niveau de compétence"
                                        name="skillLevel"
                                        value={formik.values.skillLevel}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.skillLevel && Boolean(formik.errors.skillLevel)}
                                        helperText={formik.touched.skillLevel && formik.errors.skillLevel}
                                    >
                                        {skillLevels.map((level) => (
                                            <MenuItem key={level} value={level}>
                                                {level}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Nombre de joueurs manquants"
                                        name="playersNeeded"
                                        type="number"
                                        value={formik.values.playersNeeded}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.playersNeeded && Boolean(formik.errors.playersNeeded)}
                                        helperText={formik.touched.playersNeeded && formik.errors.playersNeeded}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        Créer
                                    </StyledButton>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
