import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function AddressForm({ selectInputValueAddress, addressData, rememberThisAddress, checked }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={selectInputValueAddress}
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        value={addressData.firstName}
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={selectInputValueAddress}
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        value={addressData.lastName}
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={selectInputValueAddress}
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        value={addressData.address1}
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={selectInputValueAddress}
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        value={addressData.address2}
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={selectInputValueAddress}
                        required
                        id="city"
                        name="city"
                        label="City"
                        value={addressData.city}
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={selectInputValueAddress}
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        value={addressData.zip}
                        fullWidth
                        autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={selectInputValueAddress}
                        required
                        id="country"
                        name="country"
                        label="Country"
                        value={addressData.country}
                        fullWidth
                        autoComplete="shipping country"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        onClick={rememberThisAddress}
                        control={<Checkbox style={{ color: 'darkorange' }} name="saveAddress" value="yes" checked={checked} />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddressForm