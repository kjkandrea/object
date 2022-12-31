import {Screening} from '../Screening';

export abstract class DiscountCondition {
  public abstract isSatisfiedBy(screening: Screening): boolean;
}
