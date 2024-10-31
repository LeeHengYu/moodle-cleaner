import { useState } from "react";
import InputForm from "../components/input_form";

interface Props {
  nextPage: () => void;
  isCoursePage: boolean;
}

const CourseNotePage = ({ nextPage, isCoursePage }: Props) => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex flex-col gap-3 w-full grow bg-gray-700 h-[352px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-xl text-black">Notes</p>
        <button
          onClick={nextPage}
          className="py-1 px-3 text-white rounded-full"
          aria-label="next-page"
        >
          Filters
        </button>
      </div>
      {!isCoursePage ? (
        <p className="font-bold font-serif text-xl text-black">
          This is not a course page.
        </p>
      ) : (
        <InputForm
          value={input}
          setValue={setInput}
          description="Notes specific to the current course"
          placeholder={`
        Todo:
        Assignment 1
        `}
        />
      )}
    </div>
  );
};

export default CourseNotePage;
