import { createClient } from './client';
import type { LoggedDay } from './types';
import type { LogEntry } from '@/app/components/LoggedDayTable';
import type { LoggedDayInput } from '@/lib/validations/logged-day';

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

export async function createLoggedDay(
  input: LoggedDayInput
): Promise<{ data: LogEntry | null; error: string | null }> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: 'User not authenticated' };
  }

  const { data, error } = await supabase
    .from('logged_days')
    .insert({
      user_id: user.id,
      date: input.date,
      leetcode_problems: input.leetcode,
      dsa_hours: input.dsaHours,
      workout: input.workout,
      project_hours: input.projectHours,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating logged day:', error);
    return { data: null, error: error.message };
  }

  const row = data as LoggedDay;
  return {
    data: {
      id: row.id,
      date: row.date,
      leetcodeProblems: row.leetcode_problems,
      dsaHours: row.dsa_hours,
      workout: row.workout,
      projectHours: row.project_hours,
    },
    error: null,
  };
}
