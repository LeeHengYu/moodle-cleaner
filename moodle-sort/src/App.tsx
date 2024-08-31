import "./App.css";
import { UserConfiguration } from "./models/configuration";
import FilterPage from "./pages/filter";

function App() {
  // const childrenClass =
  //   "flex flex-col w-full justify-center gap-4 h-[350px] w-[400px]";
  const config = new UserConfiguration();
  // TODO: load the state from chrome storage API

  return (
    <div className="flex flex-col w-[400px]">
      <FilterPage config={config} />
    </div>
  );
}

export default App;
