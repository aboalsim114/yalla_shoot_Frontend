import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
const drawerWidth = 240;

export default function ButtonAppBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { updateToken } = useContext(AuthContext);

    const token = localStorage.getItem('token');
    const role_user = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleMenuIconClick = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = async () => {
        try {
            const id = localStorage.getItem('id');
            const role_user = localStorage.getItem('role');
            const conditionUrlApi = role_user === 'ROLE_ADMIN' ? 'admin' : role_user === 'ROLE_PLAYER' ? 'player' : "organizer";

            const url = `http://localhost:8888/api/${conditionUrlApi}/logout`;
            await axios.patch(
                url,
                { id: id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            localStorage.removeItem('token');
            localStorage.removeItem('id');
            updateToken(null);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const handleThemeChange = () => {
        toggleTheme();
    };

    const drawerStyle = {
        width: drawerWidth,
        transition: 'width 0.5s',
        backgroundColor: '#9D2026',
        color: 'white',
        '.MuiListItemIcon-root': {
            minWidth: 'auto',
            marginRight: '16px',
            color: 'white',
        },
        '.MuiListItemText-primary': {
            fontSize: '0.875rem',
        },
    };

    const listItemStyle = {
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: '#2222',
            color: '#fff',
        },
    };

    const DrawerListLoggedOut = [
        { to: '/', path: 'Accueil', icon: <DashboardIcon /> },
        { to: '/login', path: 'Connexion', icon: <AccountCircleIcon /> },
        { to: '/register', path: 'Inscription', icon: <AccountCircleIcon /> },
    ];

    const DrawerListLoggedIn = [
        role_user === 'ROLE_ADMIN' && {
            to: `/DashboardAdmin/${localStorage.getItem('id')}`,
            path: 'Dashboard Admin',
            icon: <SettingsIcon />,
        },
        role_user === 'ROLE_PLAYER' && {
            to: `/DashboardUser/${localStorage.getItem('id')}`,
            path: 'Accueil',
            icon: <DashboardIcon />,
        },
        role_user === 'ROLE_PLAYER' && {
            to: `/Profile/${localStorage.getItem('id')}`,
            path: 'Mon Profile',
            icon: <ExitToAppIcon />,
        },
        role_user === 'ROLE_PLAYER' && {
            to: `/RechercheGame/${localStorage.getItem('id')}`,
            path: 'Rechercher un Jeu',
            icon: <ExitToAppIcon />,
        },


        role_user === 'ROLE_ORGANIZER' && {
            to: `/DashboardOrganizer/${localStorage.getItem('id')}`,
            path: 'Dashboard ',
            icon: <SettingsIcon />,
        },

        role_user === 'ROLE_ORGANIZER' && {
            to: `/CreateGame/${localStorage.getItem('id')}`,
            path: 'Créer un Jeu',
            icon: <ExitToAppIcon />,
        },

        { path: 'Déconnexion', icon: <ExitToAppIcon />, action: handleLogout },
    ].filter(Boolean);

    const DrawerList = token ? DrawerListLoggedIn : DrawerListLoggedOut;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    marginLeft: drawerOpen ? `${drawerWidth}px` : '0',
                    backgroundColor: '#9D2026',
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenuIconClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
                    <Tooltip title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}>
                        <IconButton onClick={handleThemeChange} color="inherit">
                            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={handleMenuIconClick} sx={{ '& .MuiDrawer-paper': drawerStyle }}>
                <List>
                    {DrawerList.map((item, index) => (
                        <React.Fragment key={item.to}>
                            {index > 0 && <Divider style={{ backgroundColor: 'grey' }} />}
                            <ListItem
                                component={Link}
                                to={item.to}
                                button
                                sx={listItemStyle}
                                onClick={item.path === 'Déconnexion' && handleLogout}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.path} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
