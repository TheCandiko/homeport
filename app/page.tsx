'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Header from '@/app/components/Header';
import WeeklyHighlight from '@/app/components/WeeklyHighlight';
import LoggedDayTable, { LogEntry } from '@/app/components/LoggedDayTable';
import LogTodayButton from '@/app/components/LogTodayButton';
import DailyLogForm, {
  FormData,
  defaultFormData,
} from '@/app/components/DailyLogForm';

const initialEntries: LogEntry[] = [
  {
    id: '1',
    date: '2025-12-07',
    leetcodeProblems: 1,
    dsaHours: 1,
    workout: false,
    projectHours: 2,
  },
];

export default function Home() {
  const router = useRouter();

  // Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary data storage
  const [logEntries, setLogEntries] = useState<LogEntry[]>(initialEntries);
  const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLogged, setIsLogged] = useState(false);

  // Logout logic
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingEntry(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = () => {
    const newEntry: LogEntry = {
      id: editingEntry?.id || Date.now().toString(),
      date: formData.date || new Date().toISOString().split('T')[0],
      leetcodeProblems: parseInt(formData.leetcode) || 0,
      dsaHours: parseInt(formData.dsaHours) || 0,
      workout: formData.workout,
      projectHours: parseInt(formData.projectHours) || 0,
    };

    if (editingEntry) {
      setLogEntries((prev) =>
        prev.map((entry) => (entry.id === editingEntry.id ? newEntry : entry))
      );
    } else {
      setLogEntries((prev) => [newEntry, ...prev]);
    }

    setIsLogged(true);
    setIsModalOpen(false);
    resetForm();
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
        <LoggedDayTable
          entries={logEntries}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <DailyLogForm
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isEditing={!!editingEntry}
        formData={formData}
        onFormChange={setFormData}
      />
    </div>
  );
}
