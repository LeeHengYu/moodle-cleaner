import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import "./App.css";
import CardComponent from "./pages/sort";
import { UserConfiguration } from "./models/configuration";
import FilterPage from "./pages/filter";

function App() {
  // const childrenClass = "h-[200px] w-full flex justify-center items-stretch";
  const childrenClass = "flex flex-col gap-4 h-[350px]";
  const config = new UserConfiguration();
  // TODO: load the state from chrome storage API

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px] bg-zinc-800">
        <CardBody className="overflow-hidden">
          <Tabs fullWidth variant="light" size="lg" aria-label="Tabs form">
            <Tab key="sort" title="Sorting" className={childrenClass}>
              <CardComponent config={config} />
            </Tab>
            <Tab key="filter" title="Filtering" className={childrenClass}>
              <FilterPage config={config} />
            </Tab>
            <Tab key="config" title="Config">
              {" "}
              <div className={childrenClass}>
                <p>placeholder</p>
              </div>
            </Tab>
          </Tabs>
          <Button color="primary" className="w-full">
            Save & Refresh
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
