import { createContext, useContext } from "react";

export const CourseIdContext = createContext<number | undefined>(undefined);

export const useCourseIdContext = () => {
  const courseId = useContext(CourseIdContext);
  return courseId === undefined ? -1 : courseId;
};
