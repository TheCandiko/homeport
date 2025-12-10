import { createClient } from './client';
import type { LoggedDay } from './types';
import type { LogEntry } from '@/app/components/LoggedDayTable';

export async function getLoggedDays(): Promise<LogEntry[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('logged_days')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching logged days:', error);
    return [];
  }

  return (data as LoggedDay[]).map((row) => ({
    id: row.id,
    date: row.date,
    leetcodeProblems: row.leetcode_problems,
    dsaHours: row.dsa_hours,
    workout: row.workout,
    projectHours: row.project_hours,
  }));
}
