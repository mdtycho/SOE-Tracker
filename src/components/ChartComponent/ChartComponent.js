import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import { withFirebase } from '../Firebase';

import Loader from 'react-loader-spinner';

import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import Container from '@material-ui/core/Container';

import Backdrop from '@material-ui/core/Backdrop';
import { CssBaseline } from '@material-ui/core';

import { useHistory, useParams } from 'react-router-dom';

import useRouter from '../../hooks/useRouter';

const useStyles = makeStyles(theme => ({
    root: { flexGrow: 1, },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 14,
    },
    controls: {},
}));

function ChartComponent(props) {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [companyData, setCompanyData] = useState([]);

    const [cid, setCid] = useState('');

    //let { url_cid } = useParams();

    const theme = useTheme();

    const router = useRouter();

    useEffect(() => {
        setLoading(true);

        // just a comment

        setCid(router.query.cid);


        let ref = props.firebase.company(router.query.cid);

        ref.once('value')
            .then((snapshot) => {
                //console.log(snapshot.val());
                const companyObject = snapshot.val();

                const companyList = Object.keys(companyObject).map(key => ({
                    ...companyObject[key],
                }));

                console.log(companyList);

                setCompanyData(companyList);
                setLoading(false);
            });

        return () => { props.firebase.company(cid).off() }
    }, [props.firebase]);

    if (loading) {
        return (
            <div className={classes.root}>
                <Container maxWidth="sm">
                    <Backdrop className={classes.backdrop} open={loading}>
                        <Loader type="Grid" color="#00ff99" />
                    </Backdrop>
                </Container>
            </div>
        );
    } else if (companyData && cid) {
        return (
            <div className={classes.paper}>
                <Typography variant="h3" className={classes.title} color="textPrimary" gutterBottom>
                    {cid}
                </Typography>
                <ResponsiveContainer width="80%" height={200}>
                    <LineChart width={730} height={250} data={companyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="profit_loss" stroke={theme.palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <p>Waiting...</p>
            </div>
        )
    }


}

export default withFirebase(ChartComponent);