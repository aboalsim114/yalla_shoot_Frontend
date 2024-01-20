import React from 'react'
import { Box, Typography, Grid, Card, CardContent, useTheme, CardHeader, IconButton, Tooltip, LinearProgress } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const GraphCard = ({ title, children }) => {
    const theme = useTheme();

    return (
        <Card sx={{
            borderRadius: theme.shape.borderRadius,
            minHeight: '300px',
            padding: theme.spacing(2),
            boxShadow: theme.shadows[1],
            '&:hover': { boxShadow: theme.shadows[3] },
            transition: 'box-shadow 0.2s',
        }}>
            <CardHeader
                title={title}
                action={
                    <Tooltip title="Plus d'actions">
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                }
                titleTypographyProps={{ align: 'center', variant: 'h6', color: 'textSecondary', fontWeight: 'bold' }}
            />
            <CardContent>{children}</CardContent>
        </Card>
    );
};



export default GraphCard;