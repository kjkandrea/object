class Call {
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

const to = new Date();
const from = new Date(to.getTime() - 1000 * 60 * 5);

const call = new Call(from, to);
console.log(`통화 시간 : ${call.getDuration() / 1000}초`);
