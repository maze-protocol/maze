import React from 'react';
import {yupValidator} from "../../../../../../libs/api-interfaces/src";
import * as yup from "yup";
import {Form} from "react-final-form";
import {Button, Grid, MenuItem} from "@material-ui/core";
import {TextField, Select} from "mui-rff";

const validate = yupValidator(yup.object({
  name: yup.string().required("Required"),
  symbol: yup.string().required("Required").min(2).max(4),
  decimals: yup.number().typeError("Must be a number").required("Required").integer("Must be integer").min(2).max(18).default(18),
  totalSupply: yup.number().typeError("Must be a number").required("Required").positive("Must be positive number").integer("Must be integer")
}));

export const FormStaking = (props) => {
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
              <Select
                name="stakingAssets"
                label="Staking assets"
                style={{width: '100%'}}
                required={true}
              >
                <MenuItem value={project.symbol}>{project.symbol}</MenuItem>
                <MenuItem value={`${project.symbol}/${project.priceUnit}`} disabled>{`${project.symbol}/${project.priceUnit}`} LP (soon)</MenuItem>
                <MenuItem value={`${project.symbol}/*`} disabled>{`${project.symbol}/*`} LP (soon)</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Select
                name="stakingDuration"
                label="Reward duration"
                required={true}
                style={{width: '100%'}}
              >
                <MenuItem value="daily">daily</MenuItem>
                <MenuItem value="weekly">weekly</MenuItem>
                <MenuItem value="monthly">monthly</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Select
                name="stakingReward"
                label="Staking reward [% of total staking fund]"
                required={true}
                style={{width: '100%'}}
              >
                <MenuItem value={0.1}>0.1%</MenuItem>
                <MenuItem value={0.25}>0.25%</MenuItem>
                <MenuItem value={0.5}>0.5%</MenuItem>
                <MenuItem value={1}>1%</MenuItem>
                <MenuItem value={3}>3%</MenuItem>
                <MenuItem value={5}>5%</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
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

export default FormStaking;
