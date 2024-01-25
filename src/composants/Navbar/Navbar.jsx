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
    Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ThemeContext } from '../../context/ThemeContext';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../../context/AuthContext';
const drawerWidth = 240;

export default function ButtonAppBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { token } = useContext(AuthContext);
    const { updateToken } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleMenuIconClick = () => {
        setDrawerOpen(!drawerOpen);
    };



    const handleLogout = () => {

        updateToken(null);

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

    // Liste pour les utilisateurs non connectés
    const DrawerListLoggedOut = [
        { to: '/', path: 'Acceuil', icon: <DashboardIcon /> },
        { to: '/login', path: 'Connexion', icon: <AccountCircleIcon /> },
        { to: '/register', path: 'Inscription', icon: <AccountCircleIcon /> },
    ];

    // Liste pour les utilisateurs connectés
    const DrawerListLoggedIn = [
        { to: '/DashboardUser/:id', path: 'Acceuil', icon: <DashboardIcon /> },
        { to: '/CreateTeam', path: 'cree une equipe', icon: <SettingsIcon /> },
        { to: '/RechercheEquipe', path: 'rechercher une equipe', icon: <ExitToAppIcon /> },
        { path: 'Déconnexion', icon: <ExitToAppIcon />, action: handleLogout },

    ];

    const DrawerList = token ? DrawerListLoggedIn : DrawerListLoggedOut;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    marginLeft: drawerOpen ? `${drawerWidth}px` : '0',
                    backgroundColor: "#9D2026"
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
                    <Typography variant="h6" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                        Yallashoot
                    </Typography>
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
                            <ListItem component={Link} to={item.to} button sx={listItemStyle} onClick={item.path === 'Déconnexion' && handleLogout}>
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
