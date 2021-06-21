import React from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review({ addressData, paymentCardData }) {
    const classes = useStyles();
    const { totalPrice, items } = useSelector(({ basket }) => basket)

    const addresses = [addressData.address1, addressData.address2, addressData.city, addressData.zip, addressData.country];

    const payments = [
        { name: 'Card type', detail: 'Visa, Master' },
        { name: 'Card holder', detail: paymentCardData.cardName },
        { name: 'Card number', detail: paymentCardData.cardNumber },
        { name: 'Expiry date', detail: paymentCardData.expDate },
    ];

    const addedPizzas = Object.keys(items).map(key => {
        return items[key].items[0]
    })

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {addedPizzas.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={`${product.type}, ${product.size}`} />
                        <Typography variant="body2">{`$${product.price}`}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {`$${totalPrice}`}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Delivery (Free)
                    </Typography>
                    <Typography gutterBottom>{`${addressData.firstName} ${addressData.lastName}`}</Typography>
                    <Typography gutterBottom>{addresses.join(' ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}