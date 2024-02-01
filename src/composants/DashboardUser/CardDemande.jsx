import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { green, amber, red } from '@mui/material/colors';

export default function CardDemande({ user, details, status }) {
    // Fonction pour déterminer la couleur du Chip selon le statut
    const getStatusColor = (status) => {
        if (status === 'Acceptée') return green[500];
        if (status === 'En cours') return amber[500];
        if (status === 'Refusée') return red[500];
        return amber[500]; // Couleur par défaut si le statut est inconnu
    };

    return (
        <Card sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            m: 2,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': {
                boxShadow: 6,
            }
        }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                <Typography variant="h8" component="div" sx={{ fontWeight: 'bold' }}>
                    {user}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {details}
                </Typography>
            </CardContent>
            <Chip
                label={status}
                size="small"
                sx={{ bgcolor: getStatusColor(status), color: 'common.white', mr: 1 }}
            />
        </Card>
    );
}
