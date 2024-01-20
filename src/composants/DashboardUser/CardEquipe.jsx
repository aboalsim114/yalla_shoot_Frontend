// CardEquipe.js
import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function CardEquipe({ team }) {
    return (
        <Card sx={{
            maxWidth: 345,
            m: 2,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'box-shadow 0.2s ease-in-out, transform 0.1s ease',
            '&:hover': {
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px',
                transform: 'scale(1.02)',
            },
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    maxWidth="345"
                    image={team.imageUrl}
                    alt={team.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500', lineHeight: '1.2' }}>
                            {team.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sport: {team.sport}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}>
                        <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ mr: 0.5 }} />
                            {team.location}
                        </Typography>
                        <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>
                            Plus d'infos
                        </Button>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
