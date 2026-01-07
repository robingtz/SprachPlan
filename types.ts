export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Course {
  courseId: string;
  courseName: string;
  language: string;
  level: LanguageLevel;
  teacher: string;
  room: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string; // Format "HH:mm"
  endTime: string;   // Format "HH:mm"
}

export interface DayOption {
  value: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  label: string;
  shortLabel: string;
}