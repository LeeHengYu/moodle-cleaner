import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import InputForm from "../components/input_form";
import { useCourseIdContext } from "../contexts/courseId";
import { useNextPageContext } from "../contexts/nextPage";
import {
  initFliterStateFromCloud,
  saveParamToCloud,
  STORAGE_KEY_FILTER_PREFIX,
  STORAGE_KEY_MUST_CONTAIN,
  STORAGE_KEY_SEM,
  STORAGE_KEY_YEAR,
  storageKeys,
} from "../storage/cloud";

const FilterPage = () => {
  const [year, setYear] = useState<number | null>(null);
  const [sem, setSem] = useState<number | null>(null);
  const [prefixes, setPrefixes] = useState<string>("");
  const [mustContain, setMustContain] = useState<string>("");

  const nextPage = useNextPageContext();
  const textBorderClassName =
    "w-full max-w-sm p-2 text-md text-center border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  useEffect(() => {
    initFliterStateFromCloud((result) => {
      setYear(result.year || null);
      setSem(result.sem || null);
      setPrefixes(result.prefixes || "");
      setMustContain(result.mustContain || "");
    });
  }, []); // wrap them into zustand

  const courseId = useCourseIdContext();

  const convertYear = (y: number): string => {
    const endYear = (y + 1).toString().slice(2);
    return `${y}-${endYear}`;
  };

  const getAyOptions = (): Array<{ [key: string]: string }> => {
    const cy = new Date().getFullYear();
    const cm = new Date().getMonth(); // returns 0 - 11
    const ay = cm > 6 ? cy : cy - 1;

    const options: Array<{ key: string; label: string }> = [
      {
        key: "all",
        label: "All",
      },
    ];

    for (let i = 0; i < 3; i++) {
      const startYear = ay - i;
      options.push({
        key: startYear.toString(),
        label: convertYear(startYear),
      });
    }

    return options;
  };

  const handleYearChange = (selection: Key) => {
    if (selection == "all") {
      setYear(null);
      chrome.storage.sync.remove([STORAGE_KEY_YEAR]);
    } else {
      setYear(Number(selection));
      saveParamToCloud(STORAGE_KEY_YEAR, Number(selection));
    }
  };

  const handleSemChange = (selection: Key) => {
    if (selection == "all") {
      setSem(null);
      chrome.storage.sync.remove([STORAGE_KEY_SEM]);
    } else {
      setSem(selection as number);
      saveParamToCloud(STORAGE_KEY_SEM, selection as number);
    }
  };

  const handlePrefixesChange = (v: string) => {
    setPrefixes(v);
    saveParamToCloud(STORAGE_KEY_FILTER_PREFIX, v);
  };

  const handleMustContainChange = (v: string) => {
    setMustContain(v);
    saveParamToCloud(STORAGE_KEY_MUST_CONTAIN, v);
  };

  const clearAll = () => {
    setYear(null);
    setSem(null);
    setPrefixes("");
    setMustContain("");
    chrome.storage.sync.remove(storageKeys);
  };

  return (
    <div className="flex flex-col gap-3 w-full grow bg-gray-700 h-[352px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-xl text-black">Filter</p>
        <button
          onClick={clearAll}
          className="py-1 px-3 text-white rounded-full"
          aria-label="Clear all"
        >
          Clear All
        </button>
        <button
          onClick={nextPage}
          className="py-1 px-3 text-white rounded-full"
          aria-label="next-page"
        >
          {courseId === -1 ? "Links" : "Notes"}
        </button>
      </div>
      <Dropdown>
        <DropdownTrigger>
          <p className={textBorderClassName}>
            {typeof year == "number" ? convertYear(year) : "All Years"}
          </p>
        </DropdownTrigger>
        <DropdownMenu onAction={handleYearChange}>
          {getAyOptions().map((option) => (
            <DropdownItem key={option.key}>{option.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger>
          <p className={textBorderClassName}>{sem || "All Semesters"}</p>
        </DropdownTrigger>
        <DropdownMenu onAction={handleSemChange}>
          <DropdownItem key="all">All</DropdownItem>
          <DropdownItem key={1}>1</DropdownItem>
          <DropdownItem key={2}>2</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <InputForm
        value={prefixes}
        setValue={handlePrefixesChange}
        description="Show only courses with prefixes (delimited by ;)"
        placeholder="FINA3; ECON; COMP2"
      />
      <InputForm
        value={mustContain}
        setValue={handleMustContainChange}
        description="Must contain courses with texts (text/course alias, delimited by ;)"
        placeholder="ECON1210/microecon; Ditto/nj; Whiplash/asp"
      />
    </div>
  );
};

export default FilterPage;
