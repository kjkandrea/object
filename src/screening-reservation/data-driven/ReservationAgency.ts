import {Screening} from './Screening';
import {Customer} from './Customer';
import {Reservation} from './Reservation';
import {Money} from '../global/Money';

export class ReservationAgency {
  public reserve(
    screening: Screening,
    customer: Customer,
    audienceCount: number
  ): Reservation {
    const movie = screening.getMovie();

    const discountable = movie.getDiscountConditions().some(condition => {
      if (condition.getType() === 'PERIOD') {
        const matchedWeek =
          screening.getWhenScreened().getDay() === condition.getDayOfWeek();
        const moreThenStartTime =
          screening.getWhenScreened() >= condition.getStartTime();
        const lessThenEndTime =
          condition.getEndTime() >= screening.getWhenScreened();

        return matchedWeek && moreThenStartTime && lessThenEndTime;
      }

      return condition.getSequence() === screening.getSequence();
    });

    let fee: Money;
    if (discountable) {
      let discountAmount = Money.ZERO;
      switch (movie.getMovieType()) {
        case 'AMOUNT_DISCOUNT':
          discountAmount = movie.getDiscountAmount();
          break;
        case 'PERCENT_DISCOUNT':
          discountAmount = movie.getFee().times(movie.getDiscountPercent());
          break;
      }
      fee = movie.getFee().minus(discountAmount);
    } else {
      fee = movie.getFee();
    }

    return new Reservation(customer, screening, fee, audienceCount);
  }
}
