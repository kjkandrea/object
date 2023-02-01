import {Seconds} from 'cellphone-rate/types';
import {DateTimeInterval} from 'cellphone-rate/RatePolicy/utils/DateTimeInterval';

export default class Call {
  private readonly dateTimeInterval: DateTimeInterval;

  constructor(from: Date, to: Date) {
    this.dateTimeInterval = new DateTimeInterval(from, to);
  }

  public getDurationSeconds(): Seconds {
    return this.dateTimeInterval.durationSeconds();
  }

  public getFrom(): Date {
    return this.dateTimeInterval.getFrom();
  }

  public getTo(): Date {
    return this.dateTimeInterval.getTo();
  }

  public splitByDay() {
    return this.dateTimeInterval.splitByDay();
  }

  public getInterval() {
    return this.dateTimeInterval;
  }
}
