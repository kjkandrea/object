import {Money} from 'global/Money';
import Call from 'cellphone-rate/Call';
import {RatePolicy} from 'cellphone-rate/RatePolicy';

// 통화 목록을 계산하는 방법이 바뀔 경우만 변경된다.
export class Phone {
  private ratePolicy: RatePolicy;
  private calls: Call[] = [];

  constructor(ratePolicy: RatePolicy) {
    this.ratePolicy = ratePolicy;
  }

  public call(call: Call) {
    this.calls.push(call);
  }

  public getCalls(): Call[] {
    return this.calls;
  }

  public calculateFee(): Money {
    return this.ratePolicy.calculateFee(this);
  }
}
