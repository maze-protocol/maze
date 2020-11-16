import {FormSlider} from "../../../ui/src";
import React from "react";

export interface Message {
  message: string;
}

export interface Project {
  id: number,
  organization: string,
  website: string,
  description: string,
  shortDesc: string,
  social: Array<string>,
  name: string,
  totalSupply: number,
  symbol: string,
  decimals: number,
  distributionPresale: number,
  distributionLiquidity: number,
  distributionTeam: number,
  distributionPromotion: number,
  distributionStaking: number,
  price: number,
  priceUnit: 'TRX' | 'USDT' | 'BTC',
  softCap: number,
  ifLeft: string,
  saleLiquidity: number,
  startDate: Date,
  endDate: Date,
  stakingAssets: string,
  stakingDuration: 'daily' | 'weekly' | 'monthly',
  stakingReward: number
}

export interface ValidatorFunction {
  (value: any): boolean
}

export interface Validator {
  isValid: ValidatorFunction,
  message: string
}

export interface ValidatorContainer {
  [key: string] : Validator | Array<Validator>
}

export type Scalar = string | number | boolean | undefined | null;
