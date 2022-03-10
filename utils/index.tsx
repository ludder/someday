import React from "react";

export function formatAmount(
  amount: number,
  decimalPlaces: number = 2
): React.ReactElement {
  const className = amount < 0 ? "negative" : "positive";
  return (
    <span className={className}>{`€ ${amount.toFixed(decimalPlaces)}`}</span>
  );
}
