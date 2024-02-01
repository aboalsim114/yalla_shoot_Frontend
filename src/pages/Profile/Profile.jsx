import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
    Box, Card, CardContent, Typography, Grid, TextField, Button, Avatar, IconButton, useTheme,
    useMediaQuery, Zoom, InputAdornment, CardHeader
} from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Cake as CakeIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import Navbar from "../../composants/Navbar/Navbar";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
export default function ProfilePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const token = localStorage.getItem('token');
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    useEffect(() => {
        const FetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/api/player/user/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setProfile(response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur', error);
            }
        };
        FetchUserInfo();
    }, [id, token]);

    const formik = useFormik({
        initialValues: {
            firstName: profile?.firstName || '',
            lastName: profile?.lastName || '',
            email: profile?.email || '',
            role: profile?.role || '',
            age: profile?.age || '',
            inscriptionDate: profile?.inscriptionDate || '',
            phone: profile?.phone || ''

        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const updateUrl = `http://localhost:8888/api/player/update`;
                const response = await axios.patch(updateUrl, {
                    id: localStorage.getItem('id'),
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    role: values.role,
                    age: values.age,
                    inscriptionDate: values.inscriptionDate,
                    phone: values.phone,
                    password: profile?.password

                }, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.status === 200) {
                    console.log('Données du profil mises à jour avec succès:', response.data);
                    setProfile(response.data);
                    console.log(profile);
                    setEditing(false);
                    setOpenSnackbar(true);

                } else {
                    console.error('Échec de la mise à jour du profil:', response);
                }
            } catch (error) {
                console.error('Erreur lors de la soumission du formulaire:', error);
            }
        },
    });

    return (
        <>
            <Navbar />
            <Box sx={{ padding: theme.spacing(4) }}>
                <Zoom in={true}>
                    <Card sx={{ maxWidth: isMobile ? '100%' : "100%", margin: 'auto' }}>
                        <CardHeader
                            avatar={<Avatar><PersonIcon /></Avatar>}
                            title={<Typography variant="h5">Profile Details</Typography>}
                            action={
                                <IconButton onClick={() => setEditing(!editing)}>
                                    {editing ? <SaveIcon /> : <EditIcon />}
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} mt={2} sx={{ width: '100%' }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Prénom" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} disabled={!editing} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Nom" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} disabled={!editing} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} disabled={!editing} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Rôle" name="role" value={formik.values.role} onChange={formik.handleChange} disabled={true} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Âge" name="age" value={formik.values.age} onChange={formik.handleChange} disabled={!editing} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Date d'inscription" name="inscriptionDate" value={formik.values.inscriptionDate} onChange={formik.handleChange} disabled={!editing} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Téléphone" name="phone" value={formik.values.phone} onChange={formik.handleChange} disabled={!editing} fullWidth />
                                    </Grid>
                                </Grid>
                                {editing && (
                                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
                                        Save Changes
                                    </Button>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </Zoom>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {formik.values.firstName} {formik.values.lastName} ton profile a été mis à jour avec succès!
                </MuiAlert>
            </Snackbar>
        </>
    );
}
