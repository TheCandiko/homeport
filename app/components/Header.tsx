'use client';

import HomeportLogo from '@/app/components/HomeportLogo';
import Button from '@/app/components/Button';

interface HeaderProps {
  isLogged?: boolean;
  onButtonClick?: () => void;
}

export default function Header({
  isLogged = false,
  onButtonClick,
}: HeaderProps) {
  const CheckIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
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
    <header className="flex items-center justify-between">
      <HomeportLogo />
      <Button
        state={isLogged ? 'logged' : 'default'}
        variant="filled"
        icon={isLogged ? <CheckIcon /> : <PlusIcon />}
        onClick={onButtonClick}
      >
        {isLogged ? 'Logged Today' : 'Log Today'}
      </Button>
    </header>
  );
}
