import {Movie} from './Movie';

export class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;

  public getMovie(): Movie {
    return this.movie;
  }

  public getWhenScreened(): Date {
    return this.whenScreened;
  }

  public getSequence(): number {
    return this.sequence;
  }
}
