import React, {useState} from 'react';
import {Breadcrumbs, Container, Grid, Link, Stepper, Step, StepLabel, StepContent, Typography, Box, Button} from '@material-ui/core';
import {Project} from "@maze/api-interfaces";
import FormAbout from "./form-about/form-about";
import FormToken from "./form-token/form-token";
import FormDistribution from "./form-distribution/form-distribution";
import FormSale from "./form-sale/form-sale";
import FormStaking from "./form-staking/form-staking";
import {add} from "date-fns";
import Summary from "./summary/summary";

export interface AddProjectProps {}


export const AddProject = (props: AddProjectProps) => {

  const [activeStep, setActiveStep] = useState<number>(5);
  const [project, setProject] = useState<Project>({
    decimals: 18,
    totalSupply: 1000000,
    distributionPresale: 50,
    distributionLiquidity: 20,
    distributionTeam: 10,
    distributionPromotion: 10,
    distributionStaking: 10,
    price: 0.1,
    // softCap: 0,
    priceUnit: 'TRX',
    ifLeft: '1',
    // saleLiquidity: 0,
    stakingAssets: '',
    stakingDuration: 'weekly',
    stakingReward: 1,

    softCap: 1000,
    saleLiquidity: 70,
    organization: 'xxx',
    website: 'https://onet.pl',
    description: 'About',
    shortDesc: 'About',
    social: [
      'https://twitter.com',
      'https://twitter.com',
    ],
    name: 'TOKEN',
    symbol: 'XXX',
    startDate: add(new Date(), {days: 3}),
    endDate: add(new Date(), {days: 10}),
  } as Project)

  const handleNext = () => {
    if (activeStep === 3 && project.distributionStaking === 0) {
      return setActiveStep(activeStep + 2);
    }
    setActiveStep(activeStep + 1);
  }

  const handlePrev = () => {
    if (activeStep === 5 && project.distributionStaking === 0) {
      return setActiveStep(activeStep - 2);
    }
    setActiveStep(activeStep - 1);
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>About</StepLabel>
              <StepContent>
                <FormAbout
                  project={project}
                  handleSubmit={data => {
                    setProject({
                      ...project,
                      ...data
                    });
                    handleNext();
                  }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Token definition</StepLabel>
              <StepContent>
                <FormToken
                  project={project}
                  handlePrev={handlePrev}
                  handleSubmit={data => {
                    setProject({
                      ...project,
                      ...data,
                      stakingAssets: project.stakingAssets || data.symbol
                    });
                    handleNext();
                  }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Token distribution</StepLabel>
              <StepContent>
                <FormDistribution
                  project={project}
                  handlePrev={handlePrev}
                  handleSubmit={data => {
                    setProject({
                      ...project,
                      ...data,
                      softCap: project.softCap || Math.floor(project.totalSupply * data.distributionPresale / 100),
                      saleLiquidity: project.saleLiquidity ||
                        Math.min(100, Math.ceil((100 + Math.ceil(100 * data.distributionLiquidity / data.distributionPresale))/2))
                    });
                    handleNext();
                  }}
                  />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Token sale</StepLabel>
              <StepContent>
                <FormSale
                  project={project}
                  handlePrev={handlePrev}
                  handleSubmit={data => {
                    setProject({
                      ...project,
                      ...data,
                    });
                    handleNext();
                  }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Staking</StepLabel>
              <StepContent>
                <FormStaking
                  project={project}
                  handlePrev={handlePrev}
                  handleSubmit={data => {
                    setProject({
                      ...project,
                      ...data,
                    });
                    handleNext();
                  }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Summary</StepLabel>
              <StepContent>
                <Summary
                  project={project}
                  handlePrev={handlePrev}
                  handleSubmit={() => {

                  }}
                />
              </StepContent>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProject;
