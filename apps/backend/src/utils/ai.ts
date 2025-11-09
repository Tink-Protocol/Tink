export function suggestTip(amount: number) {
  // Simple percent-based suggestion; tweak later for merchant-specific rules
  return +(amount * 0.1).toFixed(2);
}
