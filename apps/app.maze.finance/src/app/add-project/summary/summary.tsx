import React from 'react';
import {Project} from "@maze/api-interfaces";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import {CardPieChart, TokenSummary, OrganizationSummary, CardDescription, TokenSale, TokenStaking} from "@maze/ui";

/* eslint-disable-next-line */
export interface SummaryProps {
  project: Project,
  handlePrev: () => void,
  handleSubmit: () => void
}

export const Summary = (props: SummaryProps) => {
  const {project, handlePrev, handleSubmit} = props;
  const tokenDistribution = [
    {title: `${project.distributionPresale}% Presale`, color: '#8271c6', value: project.distributionPresale},
    {
      title: `${project.distributionLiquidity}% Liquidity (JustSwap)`,
      color: '#ffbd43',
      value: project.distributionLiquidity
    },
    {title: `${project.distributionTeam}% Team`, color: '#00bdd7', value: project.distributionTeam},
    {
      title: `${project.distributionPromotion}% Promotion`,
      color: '#ff4200',
      value: project.distributionPromotion
    },
    {title: `${project.distributionStaking}% Staking`, color: '#40d4b3', value: project.distributionStaking},
  ];
  const fundsDistribution = [
    {
      title: `${project.saleLiquidity}% Liquidity (JustSwap)`,
      color: '#ffbd43',
      value: project.saleLiquidity
    },
    {
      title: `${100 - project.saleLiquidity}% Team, Promotion, Growth`,
      color: '#00bdd7',
      value: 100 - project.saleLiquidity
    },
  ];
  return (
    <>
      <Grid container spacing={3} style={{paddingTop: 30, paddingBottom: 40}}>
        <Grid item xs={12} md={6}>
          <TokenSummary project={project} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrganizationSummary project={project} />
        </Grid>
        <Grid item xs={12}>
          <CardDescription project={project} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenSale project={project} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenStaking project={project} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardPieChart data={tokenDistribution} label="Token distribution" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardPieChart data={fundsDistribution} label="Funds distribution" />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button onClick={handlePrev} style={{marginRight: 20}}>Back</Button>
          <Button
            color="primary" variant="contained"
            onClick={handleSubmit}>
            Finish
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Summary;
