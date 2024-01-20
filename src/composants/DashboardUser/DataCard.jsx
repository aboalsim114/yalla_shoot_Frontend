import React from 'react'
import { Box, Typography, Grid, Card, CardContent, useTheme, CardHeader, IconButton, Tooltip, LinearProgress } from '@mui/material';

const DataCard = ({ title, value, IconComponent, progress }) => {
    const theme = useTheme();

    return (
        <Card sx={{
            borderRadius: theme.shape.borderRadius,
            minHeight: '150px',
            padding: theme.spacing(2),
            boxShadow: theme.shadows[2],
            '&:hover': { boxShadow: theme.shadows[4] },
            transition: 'box-shadow 0.2s',
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography color="textSecondary" variant="subtitle2" fontWeight="bold">{title}</Typography>
                        <Typography variant="h5" fontWeight="bold">{value}</Typography>
                    </Box>
                    <IconComponent color="primary" sx={{ fontSize: 40 }} />
                </Box>
                <LinearProgress variant="determinate" value={progress} sx={{ marginTop: 2 }} />
            </CardContent>
        </Card>
    );
};

export default DataCard;
