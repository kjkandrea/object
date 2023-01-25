import {Money} from "screening-reservation/global/Money";
import {DiscountCondition} from "screening-reservation/role-driven/DiscountCondition";
import {Screening} from "screening-reservation/role-driven/Screening";
import {DiscountPolicy} from "screening-reservation/role-driven/DiscountPolicy";

export class AmountDiscountPolicy extends DiscountPolicy {
  private readonly discountAmount: Money;

  constructor(conditions: DiscountCondition[], discountAmount: Money) {
    super(conditions);
    this.discountAmount = discountAmount;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return this.discountAmount;
  }
}
