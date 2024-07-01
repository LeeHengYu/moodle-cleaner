import { Tab, Tabs } from "@nextui-org/react";
import "./App.css";
import CardComponent from "./pages/sorting_config_page";

function App() {
  const childrenClass = "h-full flex justify-center items-center";

  return (
    <div className="min-w-[300px] max-w-[500px] h-full">
      <Tabs
        fullWidth
        variant="light"
        size="lg"
        aria-label="Tabs form"
        className="h-full"
      >
        <Tab key="sort" title="Sorting">
          <div className={childrenClass}>
            <CardComponent />
          </div>
        </Tab>
        <Tab key="filter" title="Filtering">
          <div className={childrenClass}>
            <p>placeholder</p>
          </div>
        </Tab>

        <Tab key="style" title="Styling">
          {" "}
          <div className={childrenClass}>
            <p>placeholder</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
