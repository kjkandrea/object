import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

type DurationValue = ReturnType<typeof dayjs.duration>;

export class Duration {
  private value: DurationValue;

  constructor(value: DurationValue) {
    this.value = value;
  }

  public static ofMinute(minute: number): Duration {
    return new Duration(dayjs.duration(minute, 'minute'));
  }
}
