abstract class Movie {
  public abstract getFee(): number;
}

class Screening {
  private movie: Movie;
  private sequence: number; // 순번
  private readonly whenScreened: Date; // 상영 시작 시간

  constructor(movie: Movie, sequence: number, whenScreened: Date) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  public getStartTime(): Readonly<Date> {
    return this.whenScreened;
  }

  public isSequence(sequence: number): boolean {
    return this.sequence === sequence;
  }

  public getMovieFee(): number {
    return this.movie.getFee();
  }
}
