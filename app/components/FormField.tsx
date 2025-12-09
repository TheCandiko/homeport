import { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormField({
  label,
  type = 'text',
  className = '',
  id,
  ...props
}: FormFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  const inputClasses =
    'h-[42px] w-full rounded-[10px] border border-[#cad5e2] px-3 text-base tracking-tight text-[#0a0a0a] placeholder:text-[#0a0a0a]/50 focus:border-[#2b7fff] focus:outline-none';

  if (type === 'checkbox') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <input
          type="checkbox"
          id={inputId}
          className="size-4 rounded border-[#cad5e2] accent-[#2b7fff]"
          {...props}
        />
        <label
          htmlFor={inputId}
          className="text-base font-normal tracking-tight text-[#314158]"
        >
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={inputId}
        className="text-base font-normal tracking-tight text-[#314158]"
      >
        {label}
      </label>
      <input type={type} id={inputId} className={inputClasses} {...props} />
    </div>
  );
}
