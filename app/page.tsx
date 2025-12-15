'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  getLoggedDays,
  createLoggedDay,
  updateLoggedDay,
} from '@/lib/supabase/logged-days';
import { loggedDaySchema } from '@/lib/validations/logged-day';
import Header from '@/app/components/Header';
import WeeklyHighlight from '@/app/components/WeeklyHighlight';
import LoggedDayTable, { LogEntry } from '@/app/components/LoggedDayTable';
import LogTodayButton from '@/app/components/LogTodayButton';
import DailyLogForm, {
  FormData,
  FormErrors,
  defaultFormData,
} from '@/app/components/DailyLogForm';

export default function Home() {
  const router = useRouter();

  // Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data storage
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLogged, setIsLogged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch logged days on mount
  useEffect(() => {
    async function fetchLoggedDays() {
      setIsLoading(true);
      const entries = await getLoggedDays();
      setLogEntries(entries);
      setIsLoading(false);
    }
    fetchLoggedDays();
  }, []);

  // Logout logic
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setFormErrors({});
    setEditingEntry(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    setFormErrors({});

    const result = loggedDaySchema.safeParse(formData);

    if (!result.success) {
      const errors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormData;
        errors[field] = issue.message;
      }
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    if (editingEntry) {
      const { data, error } = await updateLoggedDay(
        editingEntry.id,
        result.data
      );

      if (error) {
        setFormErrors({ date: error });
        setIsSubmitting(false);
        return;
      }

      if (data) {
        setLogEntries((prev) =>
          prev.map((entry) => (entry.id === editingEntry.id ? data : entry))
        );
        setIsModalOpen(false);
        resetForm();
      }
    } else {
      const { data, error } = await createLoggedDay(result.data);

      if (error) {
        setFormErrors({ date: error });
        setIsSubmitting(false);
        return;
      }

      if (data) {
        setLogEntries((prev) => [data, ...prev]);
        setIsLogged(true);
        setIsModalOpen(false);
        resetForm();
      }
    }

    setIsSubmitting(false);
  };

  const handleEdit = (id: string) => {
    const entry = logEntries.find((e) => e.id === id);
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        date: entry.date,
        leetcode: entry.leetcodeProblems.toString(),
        dsaHours: entry.dsaHours.toString(),
        workout: entry.workout,
        projectHours: entry.projectHours.toString(),
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setLogEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 p-8 font-sans">
      <div className="mx-auto w-full max-w-4xl">
        <Header onLogout={handleLogout} />
      </div>
      <div className="mx-auto mt-8 w-full max-w-4xl">
        <LogTodayButton
          isLogged={isLogged}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <main className="mx-auto mt-8 flex w-full max-w-4xl flex-1 flex-col gap-8">
        <WeeklyHighlight />
        {isLoading ? (
          <div className="flex h-32 items-center justify-center rounded-[14px] bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            <span className="text-base text-[#62748e]">Loading...</span>
          </div>
        ) : (
          <LoggedDayTable
            entries={logEntries}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <DailyLogForm
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isEditing={!!editingEntry}
        formData={formData}
        onFormChange={setFormData}
        errors={formErrors}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
