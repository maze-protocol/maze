import React from 'react';
import {Project} from "@maze/api-interfaces";
import SimpleTable from "../simple-table/simple-table";

/* eslint-disable-next-line */
export interface TokenSummaryProps {
  project: Project
}

export const TokenSummary = (props: TokenSummaryProps) => {
  const {project} = props;
  return (
    <SimpleTable
      label="Summary"
      data={[
        {label: 'Name', content: project.name},
        {label: 'Symbol', content: project.symbol},
        {label: 'Type', content: 'TRC-20'},
        {label: 'Decimals', content: project.decimals},
        {label: 'Total supply', content: project.totalSupply}
      ]}
    />
  );
};

export default TokenSummary;
