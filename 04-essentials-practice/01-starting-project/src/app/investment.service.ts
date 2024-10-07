import {Injectable, signal} from '@angular/core';
import {InvestmentInput} from "./user-input/investment-input.model";
import {InvestmentResult} from "./investment-results/investment-result.model";

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  // resultData?: InvestmentResult[];
  resultData = signal<InvestmentResult[] | undefined>(undefined);

  constructor() {
  }

  public calculateInvestmentResults(data: InvestmentInput) {
    const {initialInvestment, annualInvestment, expectedReturn, duration} = data;

    const annualData: InvestmentResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest = investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.resultData.set(annualData);
  }

}
