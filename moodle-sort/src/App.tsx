import { useState } from "react";
import "./App.css";
import FilterPage from "./pages/filter";

function App() {
  const pages = ["filter", "course_note"];
  const [currentPage, setCurrentPage] = useState<number>(0);

  const nextPage = () => {
    setCurrentPage((currentPage + 1) % pages.length);
  };
  return (
    <div className="flex flex-col w-[400px]">
      <FilterPage nextPage={nextPage} />
    </div>
  );
}

export default App;
