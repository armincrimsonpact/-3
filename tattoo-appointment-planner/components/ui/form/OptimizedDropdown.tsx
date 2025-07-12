import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface OptimizedDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxHeight?: number;
  searchable?: boolean;
  clearable?: boolean;
  variant?: 'default' | 'compact';
}

export const OptimizedDropdown: React.FC<OptimizedDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  icon,
  error,
  required,
  disabled,
  className = '',
  maxHeight = 200,
  searchable = false,
  clearable = false,
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Find selected option
  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value);
  }, [options, value]);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[focusedIndex].value);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, focusedIndex, filteredOptions]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen(prev => !prev);
      setSearchTerm('');
      setFocusedIndex(-1);
    }
  }, [disabled]);

  const handleSelect = useCallback((optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  }, [onChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
  }, [onChange]);

  const buttonClasses = `
    w-full 
    bg-[#0d1520] 
    border 
    ${error ? 'border-red-500' : 'border-gray-700'} 
    text-white 
    p-3 
    rounded-md 
    focus:ring-2 
    ${error ? 'focus:ring-red-500' : 'focus:ring-teal-500'} 
    focus:border-transparent 
    transition-all 
    flex 
    justify-between 
    items-center 
    text-left
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-600'}
  `;

  const labelClasses = `
    block 
    text-white 
    font-medium 
    mb-2 
    flex 
    items-center
    ${variant === 'compact' ? 'text-sm' : ''}
  `;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className={labelClasses}>
          {icon && <span className="mr-2 text-teal-500">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={buttonClasses}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${label}-label` : undefined}
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center space-x-2">
          {clearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Clear selection"
            >
              ×
            </button>
          )}
          <ChevronDown 
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-full bg-[#0d1520] border border-gray-700 rounded-md shadow-lg"
          >
            {searchable && (
              <div className="p-2 border-b border-gray-700">
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none"
                  autoFocus
                />
              </div>
            )}
            
            <ul
              ref={listRef}
              className="py-1 max-h-48 overflow-y-auto"
              style={{ maxHeight }}
              role="listbox"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-2 text-gray-400 text-sm">
                  No options found
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li key={option.value} role="option" aria-selected={option.value === value}>
                    <button
                      type="button"
                      className={`
                        w-full 
                        text-left 
                        px-4 
                        py-2 
                        flex 
                        items-center 
                        transition-colors
                        ${option.disabled ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-gray-800'}
                        ${option.value === value ? 'text-teal-500' : 'text-white'}
                        ${index === focusedIndex ? 'bg-gray-800' : ''}
                      `}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      {option.value === value && (
                        <Check className="w-4 h-4 mr-2 text-teal-500" />
                      )}
                      {option.icon && (
                        <span className="mr-2">{option.icon}</span>
                      )}
                      {option.label}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default OptimizedDropdown; 