export function suggestTip(amount: number) {
  // Simple 10% suggestion
  return +(amount * 0.1).toFixed(2);
}

// Stub for Phantom payment
export const payWithPhantom = async (amount: number) => {
  throw new Error(
    "payWithPhantom should be done by the frontend via Phantom wallet."
  );
};
