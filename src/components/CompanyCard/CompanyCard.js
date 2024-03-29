import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 48,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    card: {
        backgroundColor: theme.palette.secondary.main,
        boxShadow: theme.spacing(2),
        opacity: 0.5,
    },
    profitable: {
        backgroundColor: theme.palette.success.main,
    },
    unprofitable: {
        backgroundColor: theme.palette.error.main,
    }
}));


function CompanyCard(props) {
    const classes = useStyles();

    const [profitable, setProfitable] = useState(true);

    const history = useHistory();

    useEffect(() => {
        let isProfitable = () => {

            //console.log(props.company);

            let newObj = JSON.parse(JSON.stringify(props.company));

            delete newObj['cid'];

            let years = Object.keys(newObj).sort((a, b) => { return (Number(b) - Number(a)) });

            let profit = Number(newObj[years[0]]['profit_loss']);

            return profit >= 0 ? true : false;
        };
        setProfitable(isProfitable());
    }, [props.company]);

    let handleClick = () => {
        history.push(`/charts/${props.company['cid']}`);
    };


    let getSeries = () => {
        let newObj = JSON.parse(JSON.stringify(props.company));

        delete newObj['cid'];

        let years = Object.keys(newObj).sort((a, b) => { return (Number(a) - Number(b)) });

        return years.map((key) => {
            return newObj[key]['profit_loss'];
        });
    };

    return (
        <Card className={clsx(classes.root, classes.pos, profitable ? classes.profitable : classes.unprofitable)}>
            <CardContent className={classes.card}>
                <Typography variant="h1" className={classes.title} color="textPrimary" gutterBottom>
                    {props.company['cid']}
                </Typography>
            </CardContent>
            <CardContent>
                <Sparklines data={getSeries()}>
                    <SparklinesLine />
                    <SparklinesBars />
                </Sparklines>
            </CardContent>
            <CardActions>
                <Button onClick={handleClick} size="small">See charts</Button>
            </CardActions>
        </Card>
    );
};

export default CompanyCard;