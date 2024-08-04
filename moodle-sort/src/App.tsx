import { Button, Tab, Tabs } from "@nextui-org/react";
import "./App.css";
import { UserConfiguration } from "./models/configuration";
import FilterPage from "./pages/filter";
import CardComponent from "./pages/sort";

function App() {
  const childrenClass =
    "flex flex-col w-full justify-center gap-4 h-[350px] w-[400px]";
  const config = new UserConfiguration();
  // TODO: load the state from chrome storage API

  return (
    <div className="flex flex-col w-[400px]">
      <Tabs
        fullWidth
        variant="light"
        size="lg"
        aria-label="Tabs form"
        className="justify-center"
      >
        <Tab key="sort" title="Sorting" className={childrenClass}>
          <CardComponent config={config} />
        </Tab>
        <Tab key="filter" title="Filtering" className={childrenClass}>
          <FilterPage config={config} />
        </Tab>
      </Tabs>
      <Button color="primary" className="w-full">
        Save & Refresh
      </Button>
    </div>
  );
}

export default App;
