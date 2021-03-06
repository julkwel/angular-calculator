import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {
  lastValue: any = 0;
  hasSign: boolean = false;
  sign: any = "+";
  prevValue: number = 0;
  secondValue: number = 0;
  waitSecondValue: boolean = false;
  willDisable: boolean = false;
  disableEqual: boolean = false;
  clockValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.updateDate();
  }

  getValue(evt: any) {
    this.updateValue(evt.target.value)
  }

  updateSign(evt: any) {
    this.setHasSign(true);
    this.setSign(evt.target.value);
    this.setPrevValue(parseFloat(this.lastValue) ?? 0);
    this.setIsWaitSecondValue(true);
  }

  calculate() {
    console.log(this.lastValue, this.prevValue, this.sign);
    let value = eval(this.prevValue + this.sign + this.lastValue);
    this.lastValue = value;
    this.setDisableEqual(true);
  }

  updateValue(lastValue: any) {
    if (this.lastValue === 0 || this.waitSecondValue) {
      this.lastValue = '';
    }

    if (!this.hasSign) {
      this.lastValue = this.lastValue + "" + lastValue;

      if (this.waitSecondValue) {
        this.setIsWaitSecondValue(false);
      }
    }
  }

  setHasSign(state: boolean) {
    this.hasSign = state;
  }

  setSign(sign: any) {
    this.sign = sign;
    this.setHasSign(false);
    this.setWillDisable(true);
  }

  setPrevValue(value: any) {
    this.prevValue = value;
  }

  setWillDisable(state: boolean) {
    this.willDisable = state;
  }

  setIsWaitSecondValue(state: boolean) {
    this.waitSecondValue = state;
  }

  setDisableEqual(state: boolean) {
    this.disableEqual = state;
  }

  reset() {
    this.lastValue = 0;
    this.setWillDisable(false);
    this.setDisableEqual(false);
  }

  updateDate() {
    let that = this;
    setInterval(function () {
      let date = (new Date());
      let hour = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      that.clockValue = that.readableValue(hour) + ' : ' + that.readableValue(min) + ' : ' + that.readableValue(sec) + ' / ' + date.getFullYear();
    }, 1000);
  }

  readableValue(value: number) {
    return value > 10 ? value : '0' + value;
  }
}
