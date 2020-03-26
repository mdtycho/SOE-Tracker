import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import GetAppIcon from '@material-ui/icons/GetApp';
import Conditional from 'react-simple-conditional';

import Grid from '@material-ui/core/Grid';

import Logo from './logosmall.png';
import { CssBaseline } from '@material-ui/core';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: theme.spacing(0),
    },
    paddingBar: {
        paddingBottom: theme.spacing(6),
    },
    logo_fmf: {
        maxWidth: 42,
    },
}));


function Navigation(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dndButton, setDnd] = useState(false);
    const [installPrompt, setInstallPrompt] = useState(null);
    const history = useHistory();

    useEffect(() => {
        console.log("Listening for Install prompt");
        window.addEventListener('beforeinstallprompt', e => {
            // For older browsers
            e.preventDefault();
            console.log("Install Prompt fired");
            setInstallPrompt(e);
            // See if the app is already installed, in that case, do nothing
            if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true) {
                return false;
            }
            // Set the state variable to make button visible
            setDnd(true);
        })
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const installApp = async () => {
        if (!installPrompt) return false;
        installPrompt.prompt();
        let outcome = await installPrompt.userChoice;
        if (outcome.outcome === 'accepted') {
            console.log("App Installed")
        }
        else {
            console.log("App not installed");
        }
        // Remove the event reference
        setInstallPrompt(null);
        // Hide the button
        setDnd(false);
    }

    const handleDrawerClick = (text) => {
        if (text === 'Home') {
            history.push("/home");
        } else if (text === 'About') {
            history.push("/about");
        } else if (text === 'Download') {
            installApp();
        }
        setOpen(false);
    };

    const getIcon = (text) => {
        if (text === 'Home') {
            return <HomeIcon />
        } else if (text === 'About') {
            return <InfoIcon />
        } else if (text === 'Download') {
            return <GetAppIcon />
        }
    };

    const getLayout = (text) => {
        if (text === 'Download') {
            return (
                <Conditional condition={dndButton}>
                    <ListItem button key={text} onClick={() => handleDrawerClick(text)}>
                        <ListItemIcon>{getIcon(text)}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                </Conditional>
            );
        } else {
            return (
                <ListItem button key={text} onClick={() => handleDrawerClick(text)}>
                    <ListItemIcon>{getIcon(text)}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            );
        }
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar id="back-to-top-anchor"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Grid justify="space-between" container spacing={2}
                        direction="row" alignItems="center"
                    >
                        <Grid item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" noWrap>
                                Tracker
                            </Typography>
                        </Grid>
                        <Grid item>
                            <a href="https://www.freemarketfoundation.com/" target="_blank" rel="noopener noreferrer">
                                <img src={Logo} alt="FMF logo." className={classes.logo_fmf} />
                            </a>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Home', 'About', 'Download'].map((text, index) => (
                        getLayout(text)
                    ))}
                </List>
                <Divider />
            </Drawer>

        </div>
    )
};

export default Navigation;