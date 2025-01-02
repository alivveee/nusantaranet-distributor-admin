import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  iconButton?: React.ReactNode; // Ikon tombol di sisi kanan
  onIconClick?: () => void; // Event untuk tombol ikon
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder = '',
  type = 'text',
  iconButton,
  onIconClick,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col w-full space-y-1.5">
          <Label htmlFor={name} className="text-gray-700">
            {label}
          </Label>
          <FormControl>
            <div className="relative">
              {/* Input Field */}
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={iconButton ? 'pr-12' : ''} // Berikan padding-right jika ada ikon
                {...field}
              />
              {/* Button Ikon */}
              {iconButton && (
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2 w-[42px] bg-gray-700"
                  onClick={onIconClick}
                >
                  {iconButton}
                </Button>
              )}
            </div>
          </FormControl>
          {/* Error Message */}
          {fieldState.error && (
            <FormMessage className="text-red-500">
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default InputField;
