import React, {useEffect, useState} from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid, IconButton,
  Typography
} from "@material-ui/core";
import {Favorite as FavoriteIcon, Share as ShareIcon} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import {Project} from "@maze/api-interfaces";

export interface ProjectsProps {
}


export const Projects = (props: ProjectsProps) => {

  const [projects, setProjects] = useState<Array<Project>>([]);
  const history = useHistory();

  useEffect(() => {
    fetch('/api/v1/projects')
      .then((r) => r.json())
      .then(res => {
        console.warn(res);
        setProjects(res);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {projects.map((project, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardActionArea onClick={() => { history.push(`/project/${project.id}`) }}>
                  <CardMedia
                    style={{
                      height: 0,
                      paddingTop: '40%'
                    }}
                    image="https://picsum.photos/400/300?blur"
                    title={project.name}/>
                  <CardContent>
                    <Typography variant="h6">
                      {project.name} ({project.symbol})
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {project.shortDesc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon/>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
};

export default Projects;
