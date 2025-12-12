import { z } from 'zod';

export const loggedDaySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  leetcode: z.coerce.number().min(0, 'Must be 0 or greater'),
  dsaHours: z.coerce.number().min(0, 'Must be 0 or greater'),
  workout: z.boolean(),
  projectHours: z.coerce.number().min(0, 'Must be 0 or greater'),
});

export type LoggedDayInput = z.infer<typeof loggedDaySchema>;
