import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {

  transform(value: string | number | null,
            inputType: 'cel' | 'fah',
            outputType?: 'cel' | 'fah') {
    if (!value) {
      return value;
    }

    let val = typeof value === 'string' ? parseFloat(value) : value;

    let outputTemp: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = this.toFahrenheit(val);
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = this.toCelcius(val);
    } else {
      outputTemp = val;
    }

    let symbol: "°C" | "°F";
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    return `${outputTemp.toFixed(2)} ${symbol}`;
  }

  private toFahrenheit(val: number) {
    return val * (9 / 5) + 32;
  }

  private toCelcius(val: number) {
    return (val - 32) * (5 / 9);
  }

}
