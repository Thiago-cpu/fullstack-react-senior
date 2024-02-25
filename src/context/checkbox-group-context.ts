import { createContext, useContext } from "react";

interface checkboxGroupContext {
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export const CheckboxGroupContext = createContext<checkboxGroupContext | null>(
  null
);

export const useCheckboxGroupContext = () => {
  const ctx = useContext(CheckboxGroupContext);
  return ctx;
};

export const CheckboxGroupProvider = CheckboxGroupContext.Provider;
