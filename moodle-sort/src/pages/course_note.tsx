import { useEffect, useState } from "react";
import { getCourseId } from "../browser/tab";

interface Props {
  nextPage: () => void;
}

const CourseNotePage = ({ nextPage }: Props) => {
  const [courseId, setCourseId] = useState<number>(0);

  useEffect(() => {
    getCourseId().then((id) => {
      setCourseId(id);
    });
  }, []);

  return (
    <div className="flex flex-col w-[400px] justify-start">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-xl text-black">Notes</p>
        <button
          onClick={nextPage}
          className="py-1 px-3 text-white rounded-full"
          aria-label="next-page"
        >
          Next Page
        </button>
      </div>
      <p className="font-semibold text-xl text-black">Class ID: {courseId}</p>
    </div>
  );
};

export default CourseNotePage;
