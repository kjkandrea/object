export class Lecture {
  private readonly pass: number;
  private readonly title: string;
  private readonly scores: number[];

  constructor(pass: number, title: string, scores: number[]) {
    this.pass = pass;
    this.title = title;
    this.scores = scores;
  }

  public average() {
    const total = this.scores.reduce((a, b) => a + b, 0);
    return total / this.scores.length;
  }

  public evaluate() {
    return `Pass:${this.passCount()} Fail:${this.failCount()}`;
  }

  private passCount() {
    return this.scores.filter(score => score >= this.pass).length;
  }

  private failCount() {
    return this.scores.length - this.passCount();
  }
}
