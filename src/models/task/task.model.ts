export interface Task {
  key?: string;
  studentName: string;
  description: string;
  start: Date;
  end: Date;
  timeRequired: number;
  fixed: boolean;
  academic: boolean;
  tAcademic: boolean;
  done: boolean;
  doneTime: string;
  source: boolean;
}