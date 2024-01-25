import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Card, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from "../../../composants/Navbar/Navbar";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
export default function DashboardAdmin() {
    const [pieData, setPieData] = useState([]);
    const [users, setUsers] = useState([]);
    const [matches, setMatches] = useState([]);







    // useEffect(() => {
    //     const mockPieData = [
    //         { name: 'Catégorie A', value: 400 },
    //         { name: 'Catégorie B', value: 300 },
    //         { name: 'Catégorie C', value: 300 },
    //     ];

    //     const mockUsers = [
    //         { id: 1, name: 'Utilisateur 1' },
    //         { id: 2, name: 'Utilisateur 2' },
    //         { id: 3, name: 'Utilisateur 3' },
    //         { id: 4, name: 'Utilisateur 4' },
    //         { id: 5, name: 'Utilisateur 5' }
    //     ]
    //     const mockMatches = [
    //         { id: 1, name: 'Match 1', date: 'Date 1' },
    //         { id: 2, name: 'Match 2', date: 'Date 2' },
    //         { id: 3, name: 'Match 3', date: 'Date 3' },
    //         { id: 4, name: 'Match 4', date: 'Date 4' },
    //         { id: 5, name: 'Match 5', date: 'Date 5' }
    //     ]

    //     setPieData(mockPieData);
    //     setUsers(mockUsers);
    //     setMatches(mockMatches);
    // }, []);

    const columnsUsers = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nom', width: 130 },
        { field: 'Actions', headerName: 'Actions', width: 200 },
    ];

    const columnsMatches = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Match', width: 130 },
        { field: 'date', headerName: 'Date et Heure', width: 200 },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>

                    {/* User list */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, minHeight: 360 }}>
                            <Typography variant="h6" color="textSecondary">Liste des Utilisateurs</Typography>
                            <Paper style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={users}
                                    columns={columnsUsers}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </Paper>
                        </Card>
                    </Grid>

                    {/* Matches list */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, minHeight: 360 }}>
                            <Typography variant="h6" color="textSecondary">Liste des Matchs</Typography>
                            <Paper style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={matches}
                                    columns={columnsMatches}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </Paper>
                        </Card>
                    </Grid>

                    {/* Pie chart */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, minHeight: 360 }}>
                            <Typography variant="h6" color="textSecondary">Répartition des Utilisateurs</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        </>
    );
}
