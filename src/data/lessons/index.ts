import { LessonContent } from '../../types';
import { WEEK1_LESSONS } from './week1';
import { WEEK2_LESSONS } from './week2';
import { WEEK3_LESSONS } from './week3';
import { WEEK4_LESSONS } from './week4';

export const ALL_LESSONS: Record<number, LessonContent> = {
  ...WEEK1_LESSONS,
  ...WEEK2_LESSONS,
  ...WEEK3_LESSONS,
  ...WEEK4_LESSONS
};
