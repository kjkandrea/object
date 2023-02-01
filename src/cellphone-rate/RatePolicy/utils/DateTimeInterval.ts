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

  public splitByDay(days?: number): DateTimeInterval[] {
    if (days === undefined) {
      if (this.days() > 0) {
        return this.splitByDay(this.days());
      }

      return [this];
    }

    const result: DateTimeInterval[] = [];
    this.addFirstDay(result);
    this.addMiddleDays(result, days);
    this.addLastDay(result);

    return result;
  }

  private days(): number {
    return this.to.getDate() - this.from.getDate();
  }

  private addFirstDay(result: DateTimeInterval[]): void {
    result.push(DateTimeInterval.toMidnight(this.from));
  }

  private addMiddleDays(result: DateTimeInterval[], days: number): void {
    for (let i = 0; i < days; i += 1) {
      const date = this.from;
      date.setDate(date.getDate() + i);
      result.push(DateTimeInterval.during(date));
    }
  }

  private addLastDay(result: DateTimeInterval[]): void {
    result.push(DateTimeInterval.toMidnight(this.to));
  }
}
