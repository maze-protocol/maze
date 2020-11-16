import React from 'react';
// import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardHeader, Container, Grid, Typography} from "@material-ui/core";


/* eslint-disable-next-line */
export interface AboutProps {}


export const About = (props: AboutProps) => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography>About project</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
