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
  const id = useId();
  const checkboxGroup = useCheckboxGroupContext();
  const isInGroup = !!checkboxGroup;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      isInGroup &&
      value &&
      checkboxGroup.onValueChange &&
      checkboxGroup.value
    ) {
      if (e.target.checked) {
        checkboxGroup.value.add(value);
      } else {
        checkboxGroup.value.delete(value);
      }
      checkboxGroup.onValueChange(Array.from(checkboxGroup.value));
    }
    onChange?.(e);
  };

  const checked = isInGroup
    ? !!value && checkboxGroup?.value?.has(value)
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
