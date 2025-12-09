'use client';

import HomeportLogo from '@/app/components/HomeportLogo';
import Button from '@/app/components/Button';

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const LogoutIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <header className="flex items-center justify-between">
      <HomeportLogo />
      <Button variant="outlined" icon={<LogoutIcon />} onClick={onLogout}>
        Logout
      </Button>
    </header>
  );
}
