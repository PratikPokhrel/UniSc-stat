import React from 'react';

interface SectionButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  selectedValue: string | number;
  onSelect: (value: string | number) => void;
  gradient?: string;
}

const SectionButton: React.FC<SectionButtonProps> = ({
  icon,
  label,
  value,
  selectedValue,
  onSelect,
  gradient = 'from-blue-500 to-blue-600',
}) => {
  const isActive = selectedValue === value;

  const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all';
  const activeClasses = `bg-gradient-to-r ${gradient} text-white shadow-sm`;
  const inactiveClasses = 'text-gray-600 hover:bg-gray-100/50';

  return (
    <button onClick={() => onSelect(value)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <span className="w-4 h-4">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default SectionButton;
