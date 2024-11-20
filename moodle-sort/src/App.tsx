import { useEffect, useState } from "react";
import "./App.css";
import { getCourseIdFromBroswer } from "./browser/tab";
import { CourseIdContext } from "./contexts/courseId";
import { NextPageContext } from "./contexts/nextPage";
import AddLinkPage from "./pages/add_link";
import CourseNotePage from "./pages/course_note";
import FilterPage from "./pages/filter";
import { initializeUserId } from "./service/user_id";

function App() {
  const NUMBER_OF_PAGE = 3;
  const [courseId, setCourseId] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [, setUserId] = useState<string>("");

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
        return <FilterPage />;
      case 1:
        return <CourseNotePage />;
      case 2:
        return <AddLinkPage />;
      default:
        return <div>Error Loading Extension...</div>;
    }
  };

  initializeUserId().then((id) => setUserId(id));

  return (
    <NextPageContext.Provider value={_nextPage}>
      <CourseIdContext.Provider value={courseId}>
        <div className="flex flex-col w-[400px]">{_renderCurrentPage()}</div>
      </CourseIdContext.Provider>
    </NextPageContext.Provider>
  );
}

export default App;
