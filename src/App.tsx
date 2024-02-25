import { useState, type ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { CheckboxGroup } from "./components/checkbox-group";
import { Checkbox } from "./components/checkbox";

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
function App() {
  const [countriesSelected, setCountriesSelected] = useState(["india"]);

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCountriesSelected(countries.map((c) => c.value));
    } else {
      setCountriesSelected([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <CheckboxGroup
        value={countriesSelected}
        onValueChange={setCountriesSelected}
      >
        <Checkbox
          checked={countriesSelected.length === 3}
          onChange={handleSelectAllChange}
        >
          Select All
        </Checkbox>
        {countries.map(({ value, label }) => (
          <Checkbox key={value} value={value}>
            {label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}

export default App;
