import {Seconds} from 'cellphone-rate/types';

export class DateTimeInterval {
  private readonly from: Date;
  private readonly to: Date;

  public static of(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }

  public static toMidnight(from: Date): DateTimeInterval {
    const to = from;
    to.setHours(23, 59, 59, 999);

    return new DateTimeInterval(from, to);
  }

  public static fromMidnight(to: Date): DateTimeInterval {
    const from = to;
    from.setHours(23, 59, 59, 999);

    return new DateTimeInterval(from, to);
  }

  public static during(date: Date): DateTimeInterval {
    const from = date;
    from.setHours(0, 0);
    const to = date;
    to.setHours(23, 59, 59, 999);
    return new DateTimeInterval(from, to);
  }

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }

  public durationSeconds(): Seconds {
    return ((this.to.getTime() - this.from.getTime()) / 1000) as Seconds;
  }

  public getFrom(): Date {
    return this.from;
  }

  public getTo(): Date {
    return this.to;
  }
}
