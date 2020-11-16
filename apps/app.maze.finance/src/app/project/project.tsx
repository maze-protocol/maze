import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Breadcrumbs, Container, Grid, Link, Typography} from "@material-ui/core";
import {Project as ProjectInterface} from "@maze/api-interfaces";

/* eslint-disable-next-line */
export interface ProjectProps {
}

export const Project = (props: ProjectProps) => {

  let {projectId} = useParams();

  const [proj, setProj] = useState<ProjectInterface>({

  } as ProjectInterface );

  useEffect(() => {
    fetch(`/api/v1/projects/${projectId}`)
      .then((r) => r.json())
      .then(setProj);
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumbs>
            <Link color="inherit" href="/">
              All projects
            </Link>
            <Typography color="textPrimary">{proj.symbol}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
    </Container>

  );
};

export default Project;
