import React from 'react';
import {Paper, Table, TableCell, TableContainer, TableRow, Typography} from "@material-ui/core";

export interface SimpleTableProps {
  label?: string,
  data: Array<{
    label: string,
    content: any
  }>
}

export const SimpleTable = (props: SimpleTableProps) => {
  const {data, label} = props;
  return (
    <TableContainer component={Paper} style={{height: '100%'}}>
      <Table>
        {label && (<TableRow>
          <TableCell colSpan={2}><Typography variant="h6">{label}</Typography></TableCell>
        </TableRow>)}
        {data.map(item => (
          <TableRow>
            <TableCell>{item.label}</TableCell>
            <TableCell>{item.content}</TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
