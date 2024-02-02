import { StdObj } from './shared';
import { RawTransaction } from './transaction';

export type RawBlock = StdObj & {
  chainId?: number;
  number: number;
  timestamp: number;
  transactions: RawTransaction[];
  gasUsed: string;
  gasLimit: string;
  baseFeePerGas: number | string;
};