import React from 'react';
import {Project} from "@maze/api-interfaces";
import {Paper, Table, TableCell, TableContainer, TableRow, Typography} from "@material-ui/core";

export interface CardDescriptionProps {
  project: Project
}

export const CardDescription = (props: CardDescriptionProps) => {
  const {project} = props;
  return (
    <TableContainer component={Paper} style={{height: '100%'}}>
      <Table>
        <TableRow>
          <TableCell><Typography variant="h6">About</Typography></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{project.description}</TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};

export default CardDescription;
