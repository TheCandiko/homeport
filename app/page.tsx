'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import WeeklyHighlight from '@/app/components/WeeklyHighlight';
import Modal from '@/app/components/Modal';
import Form from '@/app/components/Form';
import FormTitle from '@/app/components/FormTitle';
import FormField from '@/app/components/FormField';
import Button from '@/app/components/Button';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  const handleLogToday = () => {
    setIsLogged(true);
    setIsModalOpen(false);
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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 p-8 font-sans">
      <div className="mx-auto w-full max-w-4xl">
        <Header
          isLogged={isLogged}
          onButtonClick={() => setIsModalOpen(true)}
        />
      </div>
      <main className="flex flex-1 items-center justify-center">
        <WeeklyHighlight />
      </main>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <Form>
          <FormTitle
            icon={<CalendarIcon />}
            title="Daily Log"
            onClose={handleClose}
          />
          <div className="flex flex-col gap-4 p-6">
            <FormField label="Date" type="date" />
            <FormField label="LeetCode Problems" type="number" placeholder="0" />
            <FormField label="DSA Study Hours" type="number" placeholder="0" />
            <FormField label="Workout completed" type="checkbox" />
            <FormField label="Project Hours" type="number" placeholder="0" />
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
                icon={<PlusIcon />}
                onClick={handleLogToday}
              >
                Log Today
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
