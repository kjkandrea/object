import {Seconds} from 'cellphone-rate/types';

export default class Call {
  private from: Date;
  private to: Date;

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }

  public getDurationSeconds(): Seconds {
    return ((this.to.getTime() - this.from.getTime()) / 1000) as Seconds;
  }

  public getFrom(): Date {
    return this.from;
  }
}
