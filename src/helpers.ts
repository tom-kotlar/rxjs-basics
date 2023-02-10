export function calculateMortgage(interest: number, loanAmount: number, loanLength: number) {
    const calculatedInterest = interest / 1200;
    const total =
      (loanAmount * calculatedInterest) /
      (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));
  
    return total.toFixed(2);
  };