import { DatePicker } from "@mui/x-date-pickers";

interface CustomDatePickerProps {
  label: string;
  value: string | null;
  onChange: (newValue: string | null) => void;
}

export function CustomDatePicker({
  label,
  value,
  onChange
}: CustomDatePickerProps) {
  return (
    <DatePicker
      label={label}
      value={value ? new Date(value) : null}
      onChange={(date) => {
        if (!date || isNaN(date.getTime())) {
          onChange(null);
          return;
        }
        onChange(date.toISOString());
      }}
    />
  );
}
