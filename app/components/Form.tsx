import { ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
  className?: string;
}

export default function Form({ children, className = '' }: FormProps) {
  return (
    <div className={`flex w-[448px] flex-col ${className}`}>{children}</div>
  );
}
