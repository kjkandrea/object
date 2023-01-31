import {Lecture} from 'grade-calculation/Lecture';

export class Professor {
  private readonly name: string;
  private readonly lecture: Lecture;

  constructor(name: string, lecture: Lecture) {
    this.name = name;
    this.lecture = lecture;
  }

  public compileStatistics(): string {
    return `[${
      this.name
    }] ${this.lecture.evaluate()} - Avg: ${this.lecture.average()}`;
  }
}
