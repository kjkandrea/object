import {RatePolicy} from 'cellphone-rate/RatePolicy';
import {Phone} from 'cellphone-rate/Phone';
import {Money} from 'global/Money';

export abstract class AdditionalRatePolicy implements RatePolicy {
  private readonly next: RatePolicy;

  protected constructor(next: RatePolicy) {
    this.next = next;
  }

  public calculateFee(phone: Phone): Money {
    const fee = this.next.calculateFee(phone);
    return this.afterCalulated(fee);
  }

  protected abstract afterCalulated(fee: Money): Money;
}
