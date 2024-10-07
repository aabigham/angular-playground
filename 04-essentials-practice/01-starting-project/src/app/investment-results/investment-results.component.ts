import {Component, computed, input, Input} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {InvestmentResult} from "./investment-result.model";
import {InvestmentService} from "../investment.service";

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // @Input() results?: InvestmentResult[];
  // results = input<InvestmentResult[]>();
  results = computed(() => this.investmentService.resultData());

  constructor(private investmentService: InvestmentService) {
  }
  //
  // get results() {
  //   return this.investmentService.resultData();
  // }

}
