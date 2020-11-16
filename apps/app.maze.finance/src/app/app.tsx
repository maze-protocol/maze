import React, {useEffect, useState} from 'react';
import {Message} from '@maze/api-interfaces';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {
  AppBar, Box,
  Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid,
  IconButton,
  Link as BaseLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar, Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  Home as HomeIcon, Help as HelpIcon, Add as AddIcon, Menu as MenuIcon,
  Favorite as FavoriteIcon, Share as ShareIcon
} from "@material-ui/icons"
import About from "./about/about";
import Projects from "./projects/projects";
import AddProject from "./add-project/add-project";
import Project from "./project/project";

export const App = () => {
  // const [m, setMessage] = useState<Message>({message: ''});
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    console.warn(event, open)
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };

  // useEffect(() => {
  //   fetch('/api')
  //     .then((r) => r.json())
  //     .then(setMessage);
  // }, []);

  return (
    <BrowserRouter>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon/>
          </IconButton>
          <Box style={{flex: 1, textAlign: 'center', paddingRight: 48}}>
            <BaseLink href="/">
              <img src="assets/logo.png" style={{height: 30}}/>
            </BaseLink>
          </Box>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer onClose={toggleDrawer(false)}
                       onOpen={toggleDrawer(true)}
                       open={drawerState}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText>All Projects</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/add">
            <ListItemIcon><AddIcon/></ListItemIcon>
            <ListItemText>Add Project</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemIcon><HelpIcon/></ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <div style={{marginTop: 100}}>
        <Container>
          <Alert style={{marginBottom: 20}} severity="warning">Remember! Never use this product with the mainnet! This is only beta!</Alert>
        </Container>
        <Route path="/" exact>
          <Projects />
        </Route>
        <Route path="/add">
          <AddProject />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/project/:projectId">
          <Project />
        </Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
