import React, { useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import Loader from 'react-loader-spinner';

import Container from '@material-ui/core/Container';

import Backdrop from '@material-ui/core/Backdrop';

import CompanyCard from '../CompanyCard/CompanyCard';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: { flexGrow: 1, },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function HomePage(props) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        setLoading(true);

        props.firebase.companies().on('value', snapshot => {

            const companiesObject = snapshot.val();

            const companiesList = Object.keys(companiesObject).map(key => ({
                ...companiesObject[key],
                cid: key,
            }));

            setCompanies(companiesList);
            setLoading(false);
        });

        return () => { props.firebase.companies().off() }
    }, [props.firebase]);
    if (loading) {
        return (
            <div className={classes.root}>
                <Container maxWidth="sm">
                    <Backdrop className={classes.backdrop} open={loading}>
                        <Loader type="Plane" height="100%" color="#00ff99" width="100%" />
                    </Backdrop>
                </Container>
            </div>
        );
    } else if (companies && !loading && companies.length > 0) {
        let companiesRender = companies.map((company) =>

            <Grid item xs={4} key={company.cid}>
                <CompanyCard company={company} />
            </Grid>
        );
        return (
            <div className={classes.root} >
                <Grid container spacing={3}>
                    {companiesRender}
                </Grid>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <p>Wait...</p>
            </div>
        );
    }
};

export default withFirebase(HomePage);