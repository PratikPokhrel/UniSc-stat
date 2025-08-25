import React from 'react';
const SectionButton: React.FC<any> = ({
    icon,
    label,
    value,
    selectedValue,
    onSelect,
    gradient,
}) => {
    const isActive = selectedValue === value;

    return (
        <button
            onClick={() => onSelect(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${isActive
                ? `bg-gradient-to-r ${gradient} text-white shadow-sm`
                : 'text-gray-600 hover:bg-gray-100/50'
                }`}
        >
            <span className="w-4 h-4">{icon}</span>
            <span>{label}</span>
        </button>
    );
};

export default SectionButton;