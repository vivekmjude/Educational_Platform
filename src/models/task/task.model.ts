export interface Task {
  key?: string;
  description: string;
  start: Date;
  end: Date;
  timeRequired: number;
  fixed: boolean;
  academic: boolean;
  done: boolean;
  doneTime: boolean;
}