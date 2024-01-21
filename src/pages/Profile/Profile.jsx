import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
    Box, Card, CardContent, Typography, Grid, TextField, Button, Avatar, IconButton, useTheme, useMediaQuery, Zoom, InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Navbar from "../../composants/Navbar/Navbar";
import "./Profile.css";

export default function ProfilePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [profile, setProfile] = useState({
        lastName: "Doe",
        firstName: "John",
        age: "30",
        email: "john.doe@example.com"
    });

    const [editing, setEditing] = useState(false);

    const handleSubmit = async (values) => {

        console.log('Form data:', values);
        setProfile(values);
        setEditing(false);
    };

    const formik = useFormik({
        initialValues: profile,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <Navbar />
            <Box className="profileContainer">
                <Zoom in={true}>
                    <Card className="cardRoot">
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <Avatar className="avatarRoot"><PersonIcon /></Avatar>
                                    <Typography variant="h5" className="titleTypography">Profile Details</Typography>
                                </Box>
                                <IconButton onClick={() => setEditing(!editing)} color="primary">
                                    {editing ? <SaveIcon /> : <EditIcon />}
                                </IconButton>
                            </Box>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={3} mt={2}>
                                    {Object.keys(profile).map(key => (
                                        <Grid item xs={12} sm={6} key={key}>
                                            <TextField
                                                className="textFieldRoot"
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                variant="outlined"
                                                name={key}
                                                value={formik.values[key]}
                                                onChange={formik.handleChange}
                                                disabled={!editing}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            {key === 'email' ? <EmailIcon className="icon" /> :
                                                                key === 'age' ? <CakeIcon className="icon" /> : null}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid container spacing={3} mt={2}>
                                    {editing && (
                                        <Button color="primary" variant="contained" type="submit" sx={{ width: '100%', mt: 2 }}>
                                            Save Changes
                                        </Button>
                                    )}
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Zoom>
            </Box>
        </>
    );
}
