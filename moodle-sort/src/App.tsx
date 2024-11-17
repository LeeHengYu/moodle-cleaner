import { useEffect, useState } from "react";
import "./App.css";
import FilterPage from "./pages/filter";
import CourseNotePage from "./pages/course_note";
import { getCourseIdFromBroswer } from "./browser/tab";
import { CourseIdContext } from "./contexts/courseId";
import AddLinkPage from "./pages/add_link";

function App() {
  const NUMBER_OF_PAGE = 3;
  const [courseId, setCourseId] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    getCourseIdFromBroswer().then((id) => {
      setCourseId(id);
    });
  }, [courseId]);

  const _nextPage = () => {
    if (currentPage === 0 && courseId === -1) {
      setCurrentPage(2);
    } else {
      setCurrentPage((currentPage + 1) % NUMBER_OF_PAGE);
    }
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
