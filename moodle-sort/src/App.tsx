import { useEffect, useState } from "react";
import "./App.css";
import FilterPage from "./pages/filter";
import CourseNotePage from "./pages/course_note";
import { getCourseIdFromBroswer } from "./browser/tab";

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
    <div className="flex flex-col w-[400px]">
      {currentPage == 1 || courseId == -1 ? (
        <FilterPage nextPage={nextPage} isCoursePage={courseId != -1} />
      ) : (
        <CourseNotePage nextPage={nextPage} courseId={courseId} />
      )}
    </div>
  );
}

export default App;
