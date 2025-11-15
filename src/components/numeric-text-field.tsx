import { TextField } from "@mui/material";

type NumericTextInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  min?: number;
  max?: number;
};

export function NumericTextField({
  label,
  value,
  onChange,
  min = 1,
  max = 50,
}: NumericTextInputProps) {
  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={(e) => {
        const raw = e.target.value;

        if (raw === "") {
          onChange("");
          return;
        }

        const value = Number(raw);

        if (value < min) onChange(String(min));
        else if (value > max) onChange(String(max));
        else onChange(raw);
      }}
    />
  );
}
