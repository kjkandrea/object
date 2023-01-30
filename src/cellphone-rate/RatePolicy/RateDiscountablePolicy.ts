import {AdditionalRatePolicy} from 'cellphone-rate/RatePolicy/AdditionalRatePolicy';
import {Money} from 'global/Money';
import {RatePolicy} from 'cellphone-rate/RatePolicy/RatePolicy';

export class RateDiscountablePolicy extends AdditionalRatePolicy {
  private readonly discountAmount: Money;

  constructor(discountAmount: Money, next: RatePolicy) {
    super(next);
    this.discountAmount = discountAmount;
  }

  protected afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}
