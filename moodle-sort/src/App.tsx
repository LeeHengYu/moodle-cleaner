import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import "./App.css";
import CardComponent from "./pages/sort";
import { UserConfiguration } from "./models/configuration";
import FilterPage from "./pages/filter";

function App() {
  // const childrenClass = "h-[200px] w-full flex justify-center items-stretch";
  const childrenClass = "flex flex-col gap-4";
  const config = new UserConfiguration();
  // TODO: load the state from chrome storage API

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px] bg-zinc-700">
        <CardBody className="overflow-hidden">
          <Tabs fullWidth variant="light" size="lg" aria-label="Tabs form">
            <Tab key="sort" title="Sorting">
              <div className={childrenClass}>
                <CardComponent config={config} />
              </div>
            </Tab>
            <Tab key="filter" title="Filtering">
              <div className={childrenClass}>
                <FilterPage filterParam={config.filter} />
              </div>
            </Tab>

            <Tab key="config" title="Config">
              {" "}
              <div className={childrenClass}>
                <p>placeholder</p>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
