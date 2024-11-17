import { useEffect, useState } from "react";
import InputForm from "../components/input_form";
import { useCourseIdContext } from "../contexts/courseId";
import {
  getCourseNoteFromCloud,
  saveCourseNoteToCloud,
} from "../storage/cloud";

interface Props {
  nextPage: () => void;
}

const CourseNotePage = ({ nextPage }: Props) => {
  const [input, setInput] = useState<string>("");
  const courseId = useCourseIdContext();

  const handleInputChange = (v: string) => {
    setInput(v);
    saveCourseNoteToCloud(courseId, v);
  };

  useEffect(() => {
    getCourseNoteFromCloud(courseId, (note) => {
      setInput(note);
    });
  }, [courseId]);

  return (
    <div className="flex flex-col gap-3 w-full grow bg-gray-700 h-[352px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-xl text-black">Notes</p>
        <button
          onClick={nextPage}
          className="py-1 px-3 text-white rounded-full"
          aria-label="next-page"
        >
          Links
        </button>
      </div>
      {courseId === -1 ? (
        <p className="font-bold font-serif text-xl text-black">
          This is not a course page.
        </p>
      ) : (
        <InputForm
          value={input}
          setValue={handleInputChange}
          description="Notes specific to the active course"
          placeholder={`Todo:\nAssignment1`}
        />
      )}
    </div>
  );
};

export default CourseNotePage;
