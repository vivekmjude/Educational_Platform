export interface Task {
  key?: string;
  description: string;
  start: Date;
  end: Date;
  timeRequired: number;
  fixed: boolean;
  academic: boolean;
}