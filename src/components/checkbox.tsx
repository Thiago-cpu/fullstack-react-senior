import {
  type ChangeEventHandler,
  useId,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { useCheckboxGroupContext } from "../context/checkbox-group-context";

interface CheckboxProps {
  value?: string;
  children?: ReactNode;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function Checkbox({
  onChange,
  value,
  checked: checkedProp,
  children,
}: CheckboxProps) {
  const checkboxGroup = useCheckboxGroupContext();
  const isInGroup = !!checkboxGroup;
  const id = useId();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isInGroup && value && checkboxGroup.onValueChange) {
      const prevValue = checkboxGroup?.value ?? [];
      if (e.target.checked) {
        checkboxGroup.onValueChange([...prevValue, value]);
      } else {
        checkboxGroup.onValueChange(prevValue.filter((p) => p !== value));
      }
    }
    onChange?.(e);
  };

  const checked = isInGroup
    ? checkboxGroup?.value?.some((v) => v === value)
    : checkedProp;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        value={value}
        id={id}
      />
      <label htmlFor={id} style={{ userSelect: "none" }}>
        {children}
      </label>
    </div>
  );
}
