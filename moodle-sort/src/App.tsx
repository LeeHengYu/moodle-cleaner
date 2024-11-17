import { useEffect, useState } from "react";
import "./App.css";
import FilterPage from "./pages/filter";
import CourseNotePage from "./pages/course_note";
import { getCourseIdFromBroswer } from "./browser/tab";
import { CourseIdContext } from "./contexts/courseId";
import AddLinkPage from "./pages/add_link";

function App() {
  const PAGES = ["filter", "course_note", "links"];
  const [courseId, setCourseId] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(2);

  useEffect(() => {
    getCourseIdFromBroswer().then((id) => {
      setCourseId(id);
    });
    if (courseId !== -1) {
      setCurrentPage(1);
    }
  }, [courseId]);

  const _nextPage = () => {
    const n = PAGES.length;
    let nextPageIndex = (currentPage + 1) % n;
    if (nextPageIndex === 1 && courseId === -1) {
      nextPageIndex = (currentPage + 1) % n;
    }
    setCurrentPage(nextPageIndex);
  };

  const _renderCurrentPage = () => {
    switch (currentPage) {
      case 0:
        return <FilterPage nextPage={_nextPage} />;
      case 1:
        return <CourseNotePage nextPage={_nextPage} />;
      case 2:
        return <AddLinkPage nextPage={_nextPage} />;
      default:
        return <div>Error Loading Extension...</div>;
    }
  };

  return (
    <CourseIdContext.Provider value={courseId}>
      <div className="flex flex-col w-[400px]">{_renderCurrentPage()}</div>
    </CourseIdContext.Provider>
  );
}

export default App;
