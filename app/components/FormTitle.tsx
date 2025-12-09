import { ReactNode } from 'react';

interface FormTitleProps {
  icon?: ReactNode;
  title: string;
  onClose?: () => void;
}

export default function FormTitle({ icon, title, onClose }: FormTitleProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
      <div className="flex items-center gap-2">
        {icon && <span className="size-5 text-[#0f172b]">{icon}</span>}
        <h2 className="text-base font-normal tracking-tight text-[#0f172b]">
          {title}
        </h2>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="size-5 text-[#314158] transition-colors hover:text-[#0f172b]"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          </svg>
        </button>
      )}
    </div>
  );
}
