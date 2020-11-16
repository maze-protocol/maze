import React from 'react';
import SimpleTable from "../simple-table/simple-table";
import {Project} from "@maze/api-interfaces";
import format from "date-fns/format";

/* eslint-disable-next-line */
export interface TokenSaleProps {
  project: Project
}

export const TokenSale = (props: TokenSaleProps) => {
  const {project} = props;
  return (
    <SimpleTable
      label="Token sale"
      data={[
        {label: 'Price', content: `${project.price} ${project.priceUnit}`},
        {label: 'Soft cap', content: project.softCap},
        {label: 'Time', content: `${format(project.startDate, 'PPp')} - ${format(project.endDate, 'PPp')}`}
      ]}
      />
  );
};

export default TokenSale;
