import {
  type ChangeEventHandler,
  useId,
  useState,
  type ChangeEvent,
  useEffect,
} from "react";
import logo from "./logo.svg";
import "./App.css";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  const id = useId();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <input onChange={onChange} type="checkbox" checked={checked} id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

interface CheckboxGroupProps {
  items: CheckboxProps[];
}

function CheckboxGroup({ items }: CheckboxGroupProps) {
  const [itemsValues, setItemsValues] = useState<CheckboxProps[]>(
    items.map((item) => ({ ...item, checked: false }))
  );

  const handleItemChange =
    (indexToChange: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setItemsValues((prev) => {
        return prev.map((prevItem, i) => ({
          ...prevItem,
          checked: i === indexToChange ? e.target.checked : prevItem.checked,
        }));
      });
    };

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemsValues((prev) => {
      return prev.map((item) => ({ ...item, checked: e.target.checked }));
    });
  };

  useEffect(() => {
    setItemsValues(items.map((item) => ({ ...item, checked: false })));
  }, [items]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Checkbox
        checked={itemsValues.every((item) => item.checked)}
        onChange={handleSelectAllChange}
        label="Select All"
      />
      {itemsValues.map((item, i) => (
        <Checkbox
          onChange={handleItemChange(i)}
          key={`${item.label}-${i}`}
          {...item}
        />
      ))}
    </div>
  );
}

function App() {
  const countries = ["India", "USA", "France"];
  const countriesCheckboxItems = countries.map((country) => ({
    label: country,
  }));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CheckboxGroup items={countriesCheckboxItems} />
      </header>
    </div>
  );
}

export default App;
