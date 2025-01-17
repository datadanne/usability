import type { RawBlock } from '../../types';

export function transform(block: RawBlock): RawBlock {
  block.transactions = block.transactions.map((tx) => {
    if (tx.assetTransfers) {
      const fromAddresses: Set<string> = new Set(
        (tx.assetTransfers as { from: string }[]).map(
          (assetTransfer) => assetTransfer.from,
        ),
      );
      const toAddresses: Set<string> = new Set(
        (tx.assetTransfers as { to: string }[]).map(
          (assetTransfer) => assetTransfer.to,
        ),
      );
      if (
        fromAddresses.size === 1 &&
        fromAddresses.has(tx.from) &&
        toAddresses.size === 1
      ) {
        tx.neighbor = { address: tx.from, neighbor: [...toAddresses][0] };
      }
    }
    return tx;
  });

  return block;
}
