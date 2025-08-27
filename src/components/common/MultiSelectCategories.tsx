import Select from 'react-select';
import { Label } from '@/components/ui/label';

interface Option {
  value: any;
  label: string;
}

interface MultiSelectCategoriesProps {
  value: string[];
  onChange: (categories: string[]) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: Option[];
  categoriesList: any;
}

const defaultOptions: Option[] = [
  { value: 1, label: 'AI Writing' },
  { value: 2, label: 'AI Design' },
  { value: 3, label: 'AI Development' },
  { value: 4, label: 'AI Marketing' },
  { value: 5, label: 'AI Analytics' },
  { value: 6, label: 'AI Productivity' },
  { value: 45, label: 'AI Research' },
  { value: 12, label: 'AI Education' },
  { value: 13, label: 'AI Entertainment' },
  { value: 15, label: 'AI Health' },
];

const MultiSelectCategories = ({ 
  value, 
  onChange, 
  label, 
  placeholder = "Select categories...",
  required = false,
  error,
  categoriesList,
  options = categoriesList || defaultOptions
}: MultiSelectCategoriesProps) => {
  const selectedOptions = value.map(cat => ({ value: cat, label: cat }));

  const handleChange = (selectedOptions: any) => {
    const categories = selectedOptions ? selectedOptions.map((option: Option) => option.value) : [];
    onChange(categories);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      borderColor: error ? 'hsl(var(--destructive))' : state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
      '&:hover': {
        borderColor: 'hsl(var(--border))',
      },
      boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring))' : 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--popover))',
      border: '1px solid hsl(var(--border))',
      zIndex: 50,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'hsl(var(--primary))' 
        : state.isFocused 
        ? 'hsl(var(--accent))' 
        : 'transparent',
      color: state.isSelected 
        ? 'hsl(var(--primary-foreground))' 
        : 'hsl(var(--foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--secondary))',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--secondary-foreground))',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--secondary-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--destructive))',
        color: 'hsl(var(--destructive-foreground))',
      },
    }),
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>
        {label} {required && '*'}
      </Label>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default MultiSelectCategories;