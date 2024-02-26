import { useState, type ChangeEvent } from "react";
import { CheckboxGroup } from "./components/checkbox-group";
import { Checkbox } from "./components/checkbox";
import logo from "./logo.svg";
import "./App.css";

const countries = [
  {
    value: "india",
    label: "India",
  },
  {
    value: "usa",
    label: "USA",
  },
  {
    value: "france",
    label: "France",
  },
];

const allCountriesSelected = countries.map((c) => c.value);

function App() {
  const [countriesSelected, setCountriesSelected] = useState<string[]>([]);

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCountriesSelected(allCountriesSelected);
    } else {
      setCountriesSelected([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Checkbox
            checked={countriesSelected.length === countries.length}
            onChange={handleSelectAllChange}
          >
            Select All
          </Checkbox>
          <CheckboxGroup
            value={countriesSelected}
            onValueChange={setCountriesSelected}
          >
            {countries.map(({ value, label }) => (
              <Checkbox key={value} value={value}>
                {label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </header>
    </div>
  );
}

export default App;
