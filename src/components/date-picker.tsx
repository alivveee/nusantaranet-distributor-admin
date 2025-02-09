import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; // Import locale Indonesia

interface DatePickerFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  placeholder = 'Pilih tanggal',
  description,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col w-full space-y-1.5">
          {/* Label */}
          <Label htmlFor={name} className="text-gray-700 font-semibold">
            {label}
          </Label>
          <FormControl>
            {/* Popover for DatePicker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center text-left font-normal h-9"
                >
                  {field.value ? (
                    // Gunakan locale Indonesia
                    format(field.value, 'd MMMM yyyy', { locale: id })
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1); // Hari kemarin
                    return date < yesterday;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          {/* Error Message */}
          {fieldState.error && (
            <FormMessage className="text-red-500">
              {fieldState.error.message}
            </FormMessage>
          )}
          {/* Optional Description */}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </FormItem>
      )}
    />
  );
};

export default DatePickerField;
