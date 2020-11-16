import React from 'react';
import {yupValidator} from "@maze/api-interfaces";
import {Form, Field} from "react-final-form";
import {FormInputText} from "@maze/ui";
import {Box, Button, Grid, IconButton, Typography} from "@material-ui/core";
import arrayMutators from 'final-form-arrays'
import {FieldArray} from 'react-final-form-arrays'
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete"
import {TextField} from "mui-rff";
import * as yup from 'yup';

const validate = yupValidator(yup.object({
  organization: yup.string().required("Required"),
  website: yup.string().required("Required").url("URL required"),
  shortDesc: yup.string().required("Required").max(500, "Up to 500 characters"),
  description: yup.string().required("Required"),
  social: yup.array().of(yup.string().required("Required").url("URL required"))
}));

export const FormAbout = (props) => {
  const {handleSubmit, pristine, reset, submitting, project} = props
  return (
    <Form
      onSubmit={handleSubmit}
      mutators={{
        ...arrayMutators
      }}
      initialValues={project}
      validate={validate}
      render={({
                 handleSubmit,
                 form: {
                   mutators: {push, pop}
                 }, // injected from final-form-arrays above
                 pristine,
                 form,
                 submitting,
                 values
               }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="organization"
                label="Organization"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Field
                name="website"
                label="Website"
                style={{width: '100%'}}
                component={FormInputText}
              ></Field>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="shortDesc"
                label="Short description [for listing]"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Describe Your Proroject"
                style={{width: '100%'}}
                multiline
                rows={3}
                />
            </Grid>
            <Grid item xs={12}>
              <Box style={{display: "flex", flex: 1, alignItems: 'center'}}>
                <Typography variant="h6">Social links</Typography>
                <IconButton
                  style={{padding: 5, marginLeft: 10}}
                  onClick={() => push('social', undefined)}
                ><AddIcon fontSize="small"/></IconButton>
              </Box>
            </Grid>
            <FieldArray
              name="social"
            >
              {({fields}) => fields.map((name, index) => (
                <Grid item xs={12} key={name}>
                  <Box style={{display: "flex", flex: 1, alignItems: 'center'}}>
                    <TextField name={name}
                           style={{flex: 1}}
                           label="URL"
                    />
                    <IconButton
                      color="secondary"
                      style={{padding: 5, marginLeft: 10}}
                      onClick={() => fields.remove(index)}><DeleteIcon fontSize="small"/></IconButton>
                  </Box>
                </Grid>
              ))}
            </FieldArray>
            <Grid item xs={12}>

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

export default FormAbout;
