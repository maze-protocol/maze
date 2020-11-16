import React from 'react';
import {Data} from "react-minimal-pie-chart/types/commonTypes";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import {PieChart} from "react-minimal-pie-chart";
import SquareIcon from "@material-ui/icons/Stop";

export interface CardPieChartProps {
  data: Data
  label: string
}


export const CardPieChart = (props: CardPieChartProps) => {
  const {data, label} = props;
  return (
    <Card style={{height: '100%'}}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">{label}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChart
              animate
              data={data}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <List>
              {data.map(item => (
                <ListItem>
                  <ListItemIcon><SquareIcon style={{color: item.color}}/></ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardPieChart;
