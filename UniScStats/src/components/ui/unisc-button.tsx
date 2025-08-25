import React from 'react';

const UniSCButton = ({
  // Core props
  onClick,
  children = null,
  
  // Variant props
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'danger'
  size = 'medium', // 'small', 'medium', 'large'
  icon: Icon = null,
  iconPosition = 'left', // 'left', 'right'
  
  // Style props
  className = '',
  color = 'blue', // Tailwind color names
  rounded = 'full', // 'none', 'sm', 'md', 'lg', 'full'
  shadow = 'md', // 'none', 'sm', 'md', 'lg', 'xl'
  
  // State props
  disabled = false,
  loading = false,
  
  // Accessibility
  ariaLabel ='',
  type = 'button',
  
  // Animation
  withHoverEffect = true,
  withFocusEffect = true,
}) => {
  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    transition-all duration-200 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Shadow classes
  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  // Variant classes
  const getVariantClasses = () => {
    const colorMap = {
      blue: {
        primary: `bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
        secondary: `bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
        outline: `border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
        ghost: `text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
        danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2`,
      },
      gray: {
        primary: `bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,
        secondary: `bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,
        outline: `border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,
        ghost: `text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,
        danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2`,
      },
      green: {
        primary: `bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2`,
        secondary: `bg-green-100 text-green-800 hover:bg-green-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2`,
        outline: `border border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2`,
        ghost: `text-green-600 hover:bg-green-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-2`,
        danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2`,
      },
    };

    const colorConfig = colorMap[color] || colorMap.blue;
    return colorConfig[variant] || colorConfig.primary;
  };

  // Hover effect classes
  const hoverEffectClasses = withHoverEffect 
    ? 'hover:shadow-lg hover:-translate-y-0.5 transform' 
    : '';

  // Focus effect classes
  const focusEffectClasses = withFocusEffect 
    ? 'focus:ring-2 focus:ring-offset-2' 
    : '';

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${roundedClasses[rounded]}
    ${shadowClasses[shadow]}
    ${getVariantClasses()}
    ${hoverEffectClasses}
    ${focusEffectClasses}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  // Loading spinner
  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      {loading && <LoadingSpinner />}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`${children ? 'mr-2' : ''} h-4 w-4`} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`${children ? 'ml-2' : ''} h-4 w-4`} />
      )}
    </button>
  );
};

export default UniSCButton;