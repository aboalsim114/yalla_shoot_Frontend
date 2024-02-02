import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Grid, IconButton, Snackbar, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function ProfileEditModal({ open, handleClose, userData, setUserData }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Le prénom est requis'),
        lastName: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L’email est requis'),
        phone: Yup.string().required('Le téléphone est requis'),
        age: Yup.number().positive().integer().required('L’âge est requis'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const token = localStorage.getItem('token');
        try {
            const updateUrl = `http://localhost:8888/api/organizer/update`;
            const response = await axios.patch(updateUrl, {
                id: localStorage.getItem('id'),
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                role: values.role,
                age: values.age,
                inscriptionDate: userData.inscriptionDate,
                phone: values.phone,
                password: userData?.password
            }, {
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (response.status === 200) {
                setOpenSnackbar(true);
                setTimeout(() => {
                    handleClose();
                    setUserData(values);
                }, 3000)
            } else {
                console.error('Échec de la mise à jour du profil:', response);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
        setSubmitting(false);
    };

    const formFields = [
        { name: 'firstName', label: 'Prénom', icon: CloseIcon },
        { name: 'lastName', label: 'Nom', icon: CloseIcon },
        { name: 'email', label: 'Email', icon: CloseIcon },
        { name: 'phone', label: 'Téléphone', icon: CloseIcon },
        { name: 'age', label: 'Âge', icon: CloseIcon, type: 'number' },
    ];

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
                <Formik initialValues={userData} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <Typography variant="h6" component="h2" marginBottom={2}>Modifier le Profil</Typography>
                            <Grid container spacing={2}>
                                {formFields.map(field => (
                                    <Grid item xs={12} sm={6} key={field.name}>
                                        <Field as={TextField} name={field.name} label={field.label} fullWidth onChange={handleChange} onBlur={handleBlur} helperText={touched[field.name] && errors[field.name]} error={touched[field.name] && Boolean(errors[field.name])} type={field.type || 'text'} />
                                    </Grid>
                                ))}
                            </Grid>
                            <Box mt={4} display="flex" justifyContent="flex-end">
                                <Button type="submit" variant="contained" color="primary">Enregistrer</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} message="Profil mis à jour avec succès!" />
                <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
            </Box>
        </Modal>
    );
}

export default ProfileEditModal;
