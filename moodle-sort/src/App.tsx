import { Tab, Tabs } from "@nextui-org/react";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col flex-1 m-0">
      <Tabs fullWidth variant="solid" size="lg" aria-label="Tabs form">
        <Tab key="sort" title="Sorting" />
        <Tab key="filter" title="Filtering" />
        <Tab key="style" title="Styling" />
      </Tabs>
    </div>
  );
}

export default App;
