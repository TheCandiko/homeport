'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Header from '@/app/components/Header';
import WeeklyHighlight from '@/app/components/WeeklyHighlight';
import LoggedDayTable, { LogEntry } from '@/app/components/LoggedDayTable';
import Modal from '@/app/components/Modal';
import Form from '@/app/components/Form';
import FormTitle from '@/app/components/FormTitle';
import FormField from '@/app/components/FormField';
import Button from '@/app/components/Button';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>(initialEntries);
  const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);

  // Form state
  const [formDate, setFormDate] = useState('');
  const [formLeetcode, setFormLeetcode] = useState('0');
  const [formDsaHours, setFormDsaHours] = useState('0');
  const [formWorkout, setFormWorkout] = useState(false);
  const [formProjectHours, setFormProjectHours] = useState('0');

  const resetForm = () => {
    setFormDate('');
    setFormLeetcode('0');
    setFormDsaHours('0');
    setFormWorkout(false);
    setFormProjectHours('0');
    setEditingEntry(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleLogToday = () => {
    const newEntry: LogEntry = {
      id: editingEntry?.id || Date.now().toString(),
      date: formDate || new Date().toISOString().split('T')[0],
      leetcodeProblems: parseInt(formLeetcode) || 0,
      dsaHours: parseInt(formDsaHours) || 0,
      workout: formWorkout,
      projectHours: parseInt(formProjectHours) || 0,
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

  const handleEditEntry = (id: string) => {
    const entry = logEntries.find((e) => e.id === id);
    if (entry) {
      setEditingEntry(entry);
      setFormDate(entry.date);
      setFormLeetcode(entry.leetcodeProblems.toString());
      setFormDsaHours(entry.dsaHours.toString());
      setFormWorkout(entry.workout);
      setFormProjectHours(entry.projectHours.toString());
      setIsModalOpen(true);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setLogEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const CalendarIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    </svg>
  );

  const PlusIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 p-8 font-sans">
      <div className="mx-auto w-full max-w-4xl">
        <Header onLogout={handleLogout} />
      </div>
      <div className="mx-auto mt-8 w-full max-w-4xl">
        <Button
          state={isLogged ? 'logged' : 'default'}
          variant="filled"
          icon={isLogged ? <CheckIcon /> : <PlusIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          {isLogged ? 'Logged Today' : 'Log Today'}
        </Button>
      </div>
      <main className="mx-auto mt-8 flex w-full max-w-4xl flex-1 flex-col gap-8">
        <WeeklyHighlight />
        <LoggedDayTable
          entries={logEntries}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
        />
      </main>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <Form>
          <FormTitle
            icon={<CalendarIcon />}
            title={editingEntry ? 'Edit Log' : 'Daily Log'}
            onClose={handleClose}
          />
          <div className="flex flex-col gap-4 p-6">
            <FormField
              label="Date"
              type="date"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
            />
            <FormField
              label="LeetCode Problems"
              type="number"
              placeholder="0"
              value={formLeetcode}
              onChange={(e) => setFormLeetcode(e.target.value)}
            />
            <FormField
              label="DSA Study Hours"
              type="number"
              placeholder="0"
              value={formDsaHours}
              onChange={(e) => setFormDsaHours(e.target.value)}
            />
            <FormField
              label="Workout completed"
              type="checkbox"
              checked={formWorkout}
              onChange={(e) => setFormWorkout(e.target.checked)}
            />
            <FormField
              label="Project Hours"
              type="number"
              placeholder="0"
              value={formProjectHours}
              onChange={(e) => setFormProjectHours(e.target.value)}
            />
            <div className="flex gap-3 pt-4">
              <Button
                variant="outlined"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                icon={editingEntry ? <CheckIcon /> : <PlusIcon />}
                onClick={handleLogToday}
              >
                {editingEntry ? 'Save Changes' : 'Log Today'}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
