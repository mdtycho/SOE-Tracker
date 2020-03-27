import React, { useState, useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { withFirebase } from '../Firebase';

import Loader from 'react-loader-spinner';

import ChartUI from '../ChartUI/ChartUI';

import Container from '@material-ui/core/Container';

import Backdrop from '@material-ui/core/Backdrop';

import useRouter from '../../hooks/useRouter';

import Fab from '@material-ui/core/Fab';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
    controls: {
        alignItems: 'right',
    },
    item: {
        paddingBottom: theme.spacing(8),
        marginLeft: theme.spacing(2),
    }
}));

function ChartComponent(props) {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [companyData, setCompanyData] = useState([]);

    const [isLine, setIsLine] = useState(false);

    const [cid, setCid] = useState('');

    const theme = useTheme();

    const router = useRouter();

    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    const handleChange = name => event => {
        setIsLine(!isLine);
    };

    const handleFabClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

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
                setCompanyData(companyList);
                setLoading(false);
            });

        return () => { props.firebase.company(cid).off() }
    }, [props.firebase, cid, router.query.cid]);

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
        const fin_info = ['total_assets', 'current_assets', 'non_current_assets', 'total_liabilities', 'current_liabilities', 'non_current_liabilities',
            'equity', 'revenue', 'profit_loss', 'cash_and_equivalents', 'current_ratio', 'debt_ratio', 'roi', 'roe', 'net_profit_margin'];
        return (
            <div className={classes.paper}>
                <Typography variant="h1" className={classes.title} color="textPrimary" gutterBottom id="back-to-top-anchor">
                    {cid}
                </Typography>
                <div className={classes.controls}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch color="primary" checked={isLine} onChange={handleChange('line')} value="line" />
                            }
                            label="line chart"
                        />
                    </FormGroup>
                </div>
                <GridList cellHeight={220} cols={1}>
                    {fin_info.map((ratio) => (
                        <GridListTile key={ratio} className={classes.item}>
                            <ChartUI ratio={ratio} companyData={companyData} stroke={theme.palette.primary.main} line={isLine} secondary={theme.palette.secondary.main} />
                        </GridListTile>
                    ))}
                </GridList>
                <Fab color="primary" style={style} onClick={handleFabClick} size="large" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
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