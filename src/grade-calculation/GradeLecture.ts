import {Lecture} from 'grade-calculation/Lecture';
import {Grade} from 'grade-calculation/Grade';

export class GradeLecture extends Lecture {
  private grades: Grade[];

  constructor(title: string, pass: number, grades: Grade[], scores: number[]) {
    super(title, pass, scores);
    this.grades = grades;
  }

  public evaluate(): string {
    return super.evaluate() + ', ' + this.gradeStatistics();
  }

  private gradeStatistics() {
    return this.grades.map(grade => this.format(grade)).join(' ');
  }

  private format(grade: Grade): string {
    return `${grade.getName()}:${this.gradeCount(grade)}`;
  }

  private gradeCount(grade: Grade): number {
    return this.getScores().filter(score => grade.include(score)).length;
  }
}
