import { type ReactNode } from "react";
import { CheckboxGroupProvider } from "../context/checkbox-group-context";

interface CheckboxGroupProps {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  children?: ReactNode;
}

export function CheckboxGroup({
  value,
  children,
  onValueChange,
}: CheckboxGroupProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <CheckboxGroupProvider value={{ onValueChange, value: new Set(value) }}>
        {children}
      </CheckboxGroupProvider>
    </div>
  );
}
