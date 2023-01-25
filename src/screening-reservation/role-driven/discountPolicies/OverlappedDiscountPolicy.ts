import {Screening} from "screening-reservation/role-driven/Screening";
import {Money} from "screening-reservation/global/Money";
import {DiscountPolicy} from "screening-reservation/role-driven/DiscountPolicy";

export class OverlappedDiscountPolicy extends DiscountPolicy {
  private discountPolicies: DiscountPolicy[]

  constructor(...discountPolicies: DiscountPolicy[]) {
    super([])
    this.discountPolicies = discountPolicies
  }

  public calculateDiscountAmount(screening: Screening): Money {
    return this.getDiscountAmount(screening);
  }

  protected getDiscountAmount(screening: Screening): Money {
    return this.discountPolicies.reduce((money, discountPolicy) => {
      return money.plus(discountPolicy.calculateDiscountAmount(screening));
    }, Money.ZERO)
  }
}
