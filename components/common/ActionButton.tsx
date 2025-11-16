import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  label,
  icon: Icon,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 bg-[#A3B18A] text-[#1C1C1E] rounded-lg font-semibold hover:bg-[#B3C19A] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
    >
      <Icon className="w-5 h-5 mr-2" /> {label}
    </button>
  );
};

export default ActionButton;