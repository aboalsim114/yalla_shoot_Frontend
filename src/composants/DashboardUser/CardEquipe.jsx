// CardEquipe.js
import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

export default function CardEquipe({ team, gameId }) {
    const navigate = useNavigate();

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
                    image={team.imageUrl || 'https://via.placeholder.com/345x200'}
                    alt={team.category}
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
                            {team.category}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Sport: {team.category}
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
                            {team.city}
                        </Typography>
                        <Button onClick={() => navigate(`/EquipeDetailPage/${gameId}`)} size="small" variant="outlined" sx={{ textTransform: 'none' }}>
                            Plus d'infos
                        </Button>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
