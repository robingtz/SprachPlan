import { Course, LanguageLevel, User, DayOption } from './types';

// ERROR A-02: Colors are all grey
export const LEVEL_COLORS: Record<LanguageLevel, string> = {
  [LanguageLevel.A1]: '#CCCCCC', 
  [LanguageLevel.A2]: '#CCCCCC',
  [LanguageLevel.B1]: '#CCCCCC',
  [LanguageLevel.B2]: '#CCCCCC',
  [LanguageLevel.C1]: '#CCCCCC',
  [LanguageLevel.C2]: '#CCCCCC',
};

// Text color contrast helper (simple version)
export const LEVEL_TEXT_COLORS: Record<LanguageLevel, string> = {
  [LanguageLevel.A1]: '#000000',
  [LanguageLevel.A2]: '#000000',
  [LanguageLevel.B1]: '#000000',
  [LanguageLevel.B2]: '#000000',
  [LanguageLevel.C1]: '#000000',
  [LanguageLevel.C2]: '#000000',
};

export const WEEK_DAYS: DayOption[] = [
  { value: 'Monday', label: 'Montag', shortLabel: 'Mo' },
  { value: 'Tuesday', label: 'Dienstag', shortLabel: 'Di' },
  { value: 'Wednesday', label: 'Mittwoch', shortLabel: 'Mi' },
  { value: 'Thursday', label: 'Donnerstag', shortLabel: 'Do' },
  { value: 'Friday', label: 'Freitag', shortLabel: 'Fr' },
];

export const TIME_SLOTS = [
  '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'
];

// Mock Data
export const MOCK_USER: User = {
  userId: '12345',
  email: 'max.mustermann@email.com',
  firstName: 'Max',
  lastName: 'Mustermann'
};

export const MOCK_COURSES: Course[] = [
  {
    courseId: 'C001',
    courseName: 'Englisch B2',
    language: 'Englisch',
    level: LanguageLevel.B2,
    teacher: 'Sarah Miller',
    room: '204',
    dayOfWeek: 'Monday',
    // ERROR F-06: Wrong time format
    startTime: '8:0', 
    endTime: '9:30',
  },
  // ERROR A-04: Overlapping course added
  {
    courseId: 'C001_OVERLAP',
    courseName: 'Business English',
    language: 'Englisch',
    level: LanguageLevel.C1,
    teacher: 'John Doe',
    room: '205',
    dayOfWeek: 'Monday',
    startTime: '8:0',
    endTime: '9:30',
  },
  {
    courseId: 'C001_2',
    courseName: 'Englisch B2',
    language: 'Englisch',
    level: LanguageLevel.B2,
    teacher: 'Sarah Miller',
    room: '204',
    dayOfWeek: 'Wednesday',
    startTime: '8:0',
    endTime: '9:30',
  },
  {
    courseId: 'C002',
    courseName: 'Deutsch A1',
    language: 'Deutsch',
    level: LanguageLevel.A1,
    teacher: 'Thomas Schmidt',
    room: '101',
    dayOfWeek: 'Tuesday',
    startTime: '10:0',
    endTime: '11:30',
  },
  {
    courseId: 'C002_2',
    courseName: 'Deutsch A1',
    language: 'Deutsch',
    level: LanguageLevel.A1,
    teacher: 'Thomas Schmidt',
    room: '101',
    dayOfWeek: 'Thursday',
    startTime: '10:0',
    endTime: '11:30',
  },
  {
    courseId: 'C003',
    courseName: 'Spanisch C1',
    language: 'Spanisch',
    level: LanguageLevel.C1,
    teacher: 'Maria Garcia',
    room: '305',
    dayOfWeek: 'Friday',
    startTime: '14:0',
    endTime: '15:30',
  },
  {
    courseId: 'C004',
    courseName: 'Französisch A2',
    language: 'Französisch',
    level: LanguageLevel.A2,
    teacher: 'Jean Dupont',
    room: '108',
    dayOfWeek: 'Monday',
    startTime: '16:0',
    endTime: '17:30',
  }
];