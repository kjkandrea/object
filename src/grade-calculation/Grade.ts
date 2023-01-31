export class Grade {
  private readonly name: string;
  private readonly upper: number;
  private readonly lower: number;

  constructor(name: string, upper: number, lower: number) {
    this.name = name;
    this.upper = upper;
    this.lower = lower;
  }

  public getName(): string {
    return this.name;
  }

  public isName(name: string): boolean {
    return this.name === name;
  }

  public include(score: number) {
    return score >= this.lower && score <= this.upper;
  }
}
