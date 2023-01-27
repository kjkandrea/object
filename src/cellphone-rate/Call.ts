export default class Call {
  private from: Date;
  private to: Date;

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }

  public getDuration(): number {
    return this.to.getTime() - this.from.getTime();
  }
}
