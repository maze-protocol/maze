import React from 'react';
import {Button, Grid, MenuItem} from "@material-ui/core";
import {Form} from "react-final-form";
import {TextField, Select, DateTimePicker, Radios} from "mui-rff";
import * as yup from 'yup';
import {yupValidator} from "@maze/api-interfaces";
import {FormSlider} from "@maze/ui";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { add } from 'date-fns'

export const FormSale = (props) => {
  const {handleSubmit, pristine, reset, submitting, handlePrev, project} = props

  const validate = yupValidator(yup.object({
    price: yup.number()
      .typeError("Must be a number")
      .required("Required")
      .positive("Must be positive number"),
    softCap: yup.number()
      .typeError("Must be a number")
      .required("Required")
      .positive("Must be positive number")
      .max(project.totalSupply * project.distributionPresale / 100,
        "Soft cap must be less than or equal to the hard cap: ${max}"),
    saleLiquidity: yup.number().typeError("Must be a number")
      .required("Required")
      .positive("Must be positive number")
      .min(Math.ceil(100 * project.distributionLiquidity / project.distributionPresale),
        "Minimal value is ${min}% - (ROI should be at least 100%)"),
    startDate: yup.date().typeError("Must be a date")
      .required("Required")
      .min(new Date(), "Must be future date"),
    endDate: yup.date().typeError("Must be a date")
      .required("Required")
      .when('startDate', (startDate, schema) => {
        startDate = startDate instanceof Date ? startDate : new Date()
        return schema.min(add(startDate, {
          hours: 1
        }), "Sale should take at least 1 hour")
      })
  }));

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      initialValues={project}
      render={({
                 handleSubmit,
                 pristine,
                 form,
                 submitting,
                 values
               }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Token price"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="priceUnit"
                label="Price unit"
                style={{width: '100%'}}
              >
                <MenuItem value="TRX">TRX</MenuItem>
                <MenuItem value="USDT" disabled>USDT (soon)</MenuItem>
                <MenuItem value="BTC" disabled>BTC (soon)</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} style={{paddingBottom: 30}}>
              <TextField
                name="softCap"
                label="Soft cap [number of your tokens]"
                style={{width: '100%'}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Radios
                label="If some tokens left"
                name="ifLeft"
                data={[
                  {label: 'Give away to investors', value: '1'},
                  {label: 'Divide between all funds (soon)', value: '2', disabled: true},
                  {label: 'Burn (soon)', value: '3', disabled: true},
                  ]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} >
              <FormSlider
                name="saleLiquidity"
                step={1}
                label="Funds for liquidity poll"
                // onChangeMiddleware={onChangeMiddleware(0, 70)}
                style={{width: '100%'}}
                formHelperTextProps={{error: true}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <DateTimePicker
                label="Start date"
                name="startDate"
                dateFunsUtils={DateFnsUtils}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DateTimePicker
                label="End date"
                name="endDate"
                dateFunsUtils={DateFnsUtils}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handlePrev} style={{marginRight: 20}}>Back</Button>
              <Button
                color="primary" variant="contained"
                type="submit" disabled={submitting }>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default FormSale;

