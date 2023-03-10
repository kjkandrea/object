export class Money {
  public static ZERO = Money.wons(0);

  private readonly amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public getAmount(): number {
    return this.amount;
  }

  public static wons(amount: number): Money {
    return new Money(amount);
  }

  public times(percent: number): Money {
    return new Money(this.amount * percent);
  }

  public plus(amount: Money): Money {
    return new Money(this.amount + amount.amount);
  }

  public minus(amount: Money): Money {
    return new Money(this.amount - amount.amount);
  }
}
