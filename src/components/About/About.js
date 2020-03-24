import React from 'react';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    title: {
        textAlign: 'center',
    },
}));

function About(props) {

    const classes = useStyles();

    return (
        <div className={classes.root} spacing={3}>
            <Typography variant="h3" color="textSecondary" className={classes.title} gutterBottom>About</Typography>

            <Typography variant="h4" color="textSecondary" className={classes.title} gutterBottom>Background</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                When government fails to adhere to its constitutional mandate, it is up to citizens to hold it to account.

                Billions of rands in hard-earned taxpayer money have been wasted on several State-owned enterprises (SOEs) that have failed, year after year, to make a profit, cut waste and excess or incompetent staff, and/or curb the misallocation of resources.

                South Africans only find out about this when government decides to tell them, via budget speeches or the press media. No more.

                The Free Market Foundation has decided to launch a platform that allows citizens to track how government utilises their money.
            </Typography>

            <Typography variant="h4" color="textSecondary" className={classes.title} gutterBottom>What is the SOE Tracker?</Typography>
            <Typography variant='body1' color="textSecondary" gutterBottom>
                The State-Owned Enterprises Tracker (SOE Tracker) is an application developed by Mpiyakhe Dhlamini (Data Scientist) for the Free Market Foundation. It brings the information about the mismanagement of SOEs to South Africans’ fingertips.

                The financial, equity, and economic information relating to SOEs are regularly updated into the Tracker, enabling all South Africans to participate in the constitutional obligation to ensure transparency and accountability of government institutions.
            </Typography>

            <Typography variant="h4" color="textSecondary" className={classes.title} gutterBottom>What does the Constitution say?</Typography>
            <Typography variant='body1' color="textSecondary" gutterBottom>
                Section 1(d) of the Constitution provides that South Africa is founded on the value of “a multi-party system of democratic government, to ensure accountability, responsiveness and openness”.

                Section 195(1) of the Constitution provides that the public administration, including State-owned enterprises, must be governed by the following principles among others:
                <ul>
                    <li>"Efficient, economic and effective use of resources must be promoted."</li>
                    <li>"People’s needs must be responded to, and the public must be encouraged to participate in policy-making."</li>
                    <li>"Public administration must be accountable."</li>
                    <li>"Transparency must be fostered by providing the public with timely, accessible and accurate information."</li>
                </ul>
            </Typography>
        </div>
    );
}

export default About;