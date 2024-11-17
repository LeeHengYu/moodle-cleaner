import { createContext, useContext } from "react";

export const CourseIdContext = createContext<number>(-1); // default value doesn't matter

export const useCourseIdContext = () => {
  return useContext(CourseIdContext);
};
