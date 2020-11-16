import React from 'react';
import {Button, Grid} from "@material-ui/core";
import {Form} from "react-final-form";
import {TextField} from "mui-rff";
import * as yup from 'yup';
import {yupValidator} from "@maze/api-interfaces";

const validate = yupValidator(yup.object({
  name: yup.string().required("Required"),
  symbol: yup.string().required("Required").min(2).max(4),
  decimals: yup.number().typeError("Must be a number").required("Required").integer("Must be integer").min(2).max(18).default(18),
  totalSupply: yup.number().typeError("Must be a number").required("Required").positive("Must be positive number").integer("Must be integer")
}));

export const FormToken = (props) => {
  const {handleSubmit, pristine, reset, submitting, handlePrev, project} = props
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="name"
                label="Full token name (e.g. Bitcoin)"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="symbol"
                label="Token symbol (e.g. BTC)"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="totalSupply"
                label="Total supply"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="decimals"
                label="Decimals (2 - 18)"
                style={{width: '100%'}}
                />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handlePrev} style={{marginRight: 20}}>Back</Button>
              <Button
                color="primary" variant="contained"
                type="submit" disabled={submitting}>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default FormToken;
