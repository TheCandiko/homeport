import Modal from '@/app/components/Modal';
import Form from '@/app/components/Form';
import FormTitle from '@/app/components/FormTitle';
import FormField from '@/app/components/FormField';
import Button from '@/app/components/Button';

export interface FormData {
  date: string;
  leetcode: string;
  dsaHours: string;
  workout: boolean;
  projectHours: string;
}

export const defaultFormData: FormData = {
  date: '',
  leetcode: '0',
  dsaHours: '0',
  workout: false,
  projectHours: '0',
};

interface DailyLogFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEditing: boolean;
  formData: FormData;
  onFormChange: (data: FormData) => void;
}

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

export default function DailyLogForm({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  formData,
  onFormChange,
}: DailyLogFormProps) {
  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form>
        <FormTitle
          icon={<CalendarIcon />}
          title={isEditing ? 'Edit Log' : 'Daily Log'}
          onClose={onClose}
        />
        <div className="flex flex-col gap-4 p-6">
          <FormField
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
          />
          <FormField
            label="LeetCode Problems"
            type="number"
            placeholder="0"
            value={formData.leetcode}
            onChange={(e) => updateField('leetcode', e.target.value)}
          />
          <FormField
            label="DSA Study Hours"
            type="number"
            placeholder="0"
            value={formData.dsaHours}
            onChange={(e) => updateField('dsaHours', e.target.value)}
          />
          <FormField
            label="Workout completed"
            type="checkbox"
            checked={formData.workout}
            onChange={(e) => updateField('workout', e.target.checked)}
          />
          <FormField
            label="Project Hours"
            type="number"
            placeholder="0"
            value={formData.projectHours}
            onChange={(e) => updateField('projectHours', e.target.value)}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="outlined" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="filled"
              icon={isEditing ? <CheckIcon /> : <PlusIcon />}
              onClick={onSubmit}
            >
              {isEditing ? 'Save Changes' : 'Log Today'}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
