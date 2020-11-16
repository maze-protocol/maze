import React, {useState} from 'react';
import {Form} from "react-final-form";
import {Button, Grid} from "@material-ui/core";
import {TextField} from "mui-rff";
import {yupValidator} from "@maze/api-interfaces";
import {Field} from "react-final-form";
import * as yup from "yup";
import {FormSlider} from "@maze/ui";
import {Project} from "@maze/api-interfaces";

const validate = yupValidator(yup.object({
  distributionPresale: yup.number().typeError("Must be a number")
    .positive("Must be positive number")
    .integer("Must be integer")
    .max(70, "At most 70%")
    .min(20, "At least 20%")
    ,
  distributionLiquidity: yup.number().typeError("Must be a number")
    .positive("Must be positive number")
    .integer("Must be integer")
    .min(10, "At least 10%")
    .max(70, "At most 70%"),
  distributionTeam: yup.number().typeError("Must be a number")
    .positive("Must be positive number")
    .integer("Must be integer")
    .min(0, "At least 0%")
    .max(70, "At most 70%"),
  distributionPromotion: yup.number().typeError("Must be a number")
    .positive("Must be positive number")
    .integer("Must be integer")
    .min(0, "At least 0%")
    .max(70, "At most 70%"),
  distributionStaking: yup.number().typeError("Must be a number")
    .positive("Must be positive number")
    .integer("Must be integer")
    .min(0, "At least 0%")
    .max(70, "At most 70%")
    .when(['distributionLiquidity', 'distributionTeam',
        'distributionPromotion', 'distributionPresale'],
      (distributionLiquidity, distributionTeam,
       distributionPromotion, distributionPresale, schema) => {
        const sum = [distributionLiquidity, distributionTeam,
          distributionPromotion, distributionPresale].reduce((carry: number, current: number) => carry + current, 0);
        return schema.test({
          test: value => value + sum === 100,
          message: params => `There is ${100 - sum - params.value}% tokens left to distribute`
        })
      }
    )
}));

export const FormDistribution = props => {
  const {handleSubmit, pristine, reset, submitting, handlePrev, project} = props
  const [sum, setSum] = useState(100);
  const onChangeMiddleware = (min: number, max: number) => (currentValue: number, newValue: number): number => {
    currentValue = currentValue || 0;
    newValue = Math.max(min, Math.min(max, newValue));
    const currentSum = sum - currentValue;
    if (currentSum + newValue <= 100) {
      setSum(currentSum + newValue);
      return newValue;
    }
    setSum(100);
    return 100 - currentSum;
  }
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
              <FormSlider
                name="distributionPresale"
                step={1}
                label="Public sale"
                onChangeMiddleware={onChangeMiddleware(20, 70)}
                style={{width: '100%'}}
                formHelperTextProps={{color: 'error'}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormSlider
                name="distributionLiquidity"
                step={1}
                label="Liquidity pool"
                onChangeMiddleware={onChangeMiddleware(10, 70)}
                style={{width: '100%'}}
                formHelperTextProps={{color: 'error'}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormSlider
                name="distributionTeam"
                step={1}
                label="Team"
                onChangeMiddleware={onChangeMiddleware(0, 70)}
                style={{width: '100%'}}
                formHelperTextProps={{color: 'error'}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormSlider
                name="distributionPromotion"
                step={1}
                label="Promotion"
                onChangeMiddleware={onChangeMiddleware(0, 70)}
                style={{width: '100%'}}
                formHelperTextProps={{color: 'error'}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormSlider
                name="distributionStaking"
                step={1}
                label="Staking"
                onChangeMiddleware={onChangeMiddleware(0, 70)}
                style={{width: '100%'}}
                formHelperTextProps={{error: true}}
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

export default FormDistribution;
