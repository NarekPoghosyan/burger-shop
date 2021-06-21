import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import '../scss/app.scss'

let randomNumber = Math.floor(Math.random() * 1000000)

function Copyright() {
    return (
        <Typography variant="body2" style={{ color: 'white' }} align="center">
            {'Copyright © '}
            <Link style={{ color: 'darkorange' }} href="/">
                Burger Shop
            </Link>{' '}
            {new Date().getFullYear()}
            {' by Narek Poghosyan.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, selectInputValueAddress, selectInputValuePayment, addressData, paymentCardData, rememberThisAddress, rememberPayment, checkedAddress, checkedPayment) {
    switch (step) {
        case 0:
            return <AddressForm selectInputValueAddress={selectInputValueAddress} addressData={addressData} rememberThisAddress={rememberThisAddress} checked={checkedAddress} />;
        case 1:
            return <PaymentForm selectInputValuePayment={selectInputValuePayment} paymentCardData={paymentCardData} rememberPayment={rememberPayment} checked={checkedPayment} />;
        case 2:
            return <Review addressData={addressData} paymentCardData={paymentCardData} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [addressData, setAddressData] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        zip: '',
        country: '',
    })
    const [paymentCardData, setPaymentCardData] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
    })
    const [checkedAddress, setCheckedAddress] = useState(false)
    const [checkedPayment, setCheckedPayment] = useState(false)

    const selectInputValuePayment = useCallback(e => {
        setPaymentCardData({ ...paymentCardData, [e.target.id]: e.target.value })
    }, [paymentCardData])

    const selectInputValueAddress = useCallback(e => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value })
    }, [addressData])

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const rememberThisAddress = useCallback(() => {
        localStorage.setItem('addressData', JSON.stringify(addressData))
        setCheckedAddress(true)
    }, [addressData])

    const rememberPayment = useCallback(() => {
        localStorage.setItem('paymentData', JSON.stringify(paymentCardData))
        setCheckedPayment(true)
    }, [paymentCardData])

    useEffect(() => {
        const dataObj = JSON.parse(localStorage.getItem('addressData')) || []
        if (Object.keys(dataObj).length) {
            setAddressData(dataObj)
            setCheckedAddress(true)
            return
        }
    }, [])

    useEffect(() => {
        const dataObj = JSON.parse(localStorage.getItem('paymentData')) || []
        if (Object.keys(dataObj).length) {
            setPaymentCardData(dataObj)
            setCheckedPayment(true)
            return
        }
    }, [])

    return (
        <React.Fragment>
            <main className={classes.layout} >
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" id="step-none">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper} id="step-none">
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #{randomNumber}. We have emailed your order confirmation, and will
                                    send you an update when your order has delivered.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, selectInputValueAddress, selectInputValuePayment, addressData, paymentCardData, rememberThisAddress, rememberPayment, checkedAddress, checkedPayment)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        style={{ color: 'white', backgroundColor: 'darkorange' }}
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}