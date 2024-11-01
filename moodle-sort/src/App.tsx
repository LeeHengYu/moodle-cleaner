import { useEffect, useState } from "react";
import "./App.css";
import FilterPage from "./pages/filter";
import CourseNotePage from "./pages/course_note";
import { getCourseIdFromBroswer } from "./browser/tab";
import { CourseIdContext } from "./contexts/courseId";

function App() {
  const pages = ["filter", "course_note"];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [courseId, setCourseId] = useState<number>(-1);

  useEffect(() => {
    getCourseIdFromBroswer().then((id) => {
      setCourseId(id);
    });
  }, []);

  const nextPage = () => {
    setCurrentPage((currentPage + 1) % pages.length);
  };

  return (
    <CourseIdContext.Provider value={courseId}>
      <div className="flex flex-col w-[400px]">
        {currentPage == 0 || courseId == -1 ? (
          <FilterPage nextPage={nextPage} />
        ) : (
          <CourseNotePage nextPage={nextPage} />
        )}
      </div>
    </CourseIdContext.Provider>
  );
}

export default App;
