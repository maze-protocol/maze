import React from 'react';
import SimpleTable from "../simple-table/simple-table";
import {Project} from "@maze/api-interfaces";

/* eslint-disable-next-line */
export interface TokenStakingProps {
  project: Project
}

export const TokenStaking = (props: TokenStakingProps) => {
  const {project} = props;
  return (
    <SimpleTable
      label="Token staking"
      data={[
        {label: 'Assets', content: project.stakingAssets},
        {label: 'Duration', content: project.stakingDuration},
        {label: 'Reward', content: `${project.stakingReward}%`}
      ]}
    />
  );
};

export default TokenStaking;
