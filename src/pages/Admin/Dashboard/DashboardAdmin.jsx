import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Card, Paper, CircularProgress, useTheme, useMediaQuery
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from "../../../composants/Navbar/Navbar";
import axios from 'axios';

export default function DashboardAdmin() {
    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingGames, setLoadingGames] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUsers();
        fetchGames();
    }, []);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const response = await axios.get(`http://localhost:8888/api/admin/users`, { headers: { "Authorization": `Bearer ${token}` } });
            if (response.status === 200) {
                setUsers(response.data.map((user, index) => ({ ...user, id: index })));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchGames = async () => {
        setLoadingGames(true);
        try {
            const response = await axios.get('http://localhost:8888/api/admin/games/dates', { headers: { "Authorization": `Bearer ${token}` } });
            if (response.status === 200) {
                setGames(response.data.map((game, index) => ({ ...game, id: index })));
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des jeux:', error);
        } finally {
            setLoadingGames(false);
        }
    };

    const columnsUsers = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Prénom', width: 130 },
        { field: 'lastName', headerName: 'Nom de famille', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'actions', headerName: 'Actions', width: 130 },
    ];

    const columnsGames = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nom du jeu', width: 130 },
        { field: 'category', headerName: 'Catégorie', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
    ];

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const cardStyle = {
        p: 2,
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3]
    };

    const dataGridStyle = {
        height: 400,
        width: '100%',
        '& .MuiDataGrid-root': {
            border: 0,
        },
        '& .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default }}>
                <Grid container spacing={3}>
                    {/* User list */}
                    <Grid item xs={12} md={6} >
                        <Card sx={cardStyle}>
                            <Typography variant={matches ? 'h6' : 'subtitle1'} color="primary">Liste des Utilisateurs</Typography>
                            {loadingUsers ? <CircularProgress /> : (
                                <Paper style={dataGridStyle}>
                                    <DataGrid
                                        rows={users}
                                        columns={columnsUsers}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                    />
                                </Paper>
                            )}
                        </Card>
                    </Grid>

                    {/* Games list */}
                    <Grid item xs={12} md={6}>
                        <Card sx={cardStyle}>
                            <Typography variant={matches ? 'h6' : 'subtitle1'} color="primary">Liste des Jeux</Typography>
                            {loadingGames ? <CircularProgress /> : (
                                <Paper style={dataGridStyle}>
                                    <DataGrid
                                        rows={games}
                                        columns={columnsGames}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                    />
                                </Paper>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
