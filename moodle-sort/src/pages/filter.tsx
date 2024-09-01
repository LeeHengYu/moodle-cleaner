import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import InputForm from "../components/input_form";

const FilterPage = () => {
  const [year, setYear] = useState<number | undefined>();
  const [sem, setSem] = useState<number | undefined>();
  const [prefixes, setPrefixes] = useState<string>("");
  const [mustContain, setMustContain] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get(
      ["year", "sem", "prefixes", "mustContain"],
      (result) => {
        setYear(result.year);
        setSem(result.sem);
        setPrefixes(result.prefixes || "");
        setMustContain(result.mustContain || "");
      }
    );
  }, []);

  const saveToStorage = (key: string, value: any) => {
    chrome.storage.sync.set({ [key]: value });
  };

  const handleYearChange = (v: string) => {
    const res = Math.max(parseInt(v) || 2020, 2020);
    setYear(res);
    saveToStorage("year", res);
  };

  const handleSemChange = (v: string) => {
    const newSem = v ? (parseInt(v) >= 2 ? 2 : 1) : undefined;
    setSem(newSem);
    saveToStorage("sem", newSem);
  };

  const clearYearSem = () => {
    setYear(undefined);
    setSem(undefined);
    chrome.storage.sync.remove(["year", "sem"]);
  };

  const handlePrefixesChange = (v: string) => {
    setPrefixes(v);
    saveToStorage("prefixes", v);
  };

  const handleMustContainChange = (v: string) => {
    setMustContain(v);
    saveToStorage("mustContain", v);
  };

  return (
    <div className="flex flex-col gap-3 w-full grow bg-gray-700 h-[352px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-xl text-black">Filters</p>
        <button
          onClick={clearYearSem}
          className="py-1 px-3 text-white rounded-full"
          aria-label="Clear year and semester"
        >
          Clear
        </button>
      </div>
      <Input
        type="number"
        size="md"
        label="Academic Year"
        value={year?.toString() || ""}
        onValueChange={handleYearChange}
        fullWidth
      />
      <Input
        type="number"
        size="md"
        label="Semester (only 1 or 2)"
        value={sem?.toString() || ""}
        onValueChange={handleSemChange}
        fullWidth
      />
      <InputForm
        isDisabled={false}
        value={prefixes}
        setValue={handlePrefixesChange}
        description="Show only courses with prefixes"
        placeholder="FINA3; ECON; COMP2"
      />
      <InputForm
        isDisabled={false}
        value={mustContain}
        setValue={handleMustContainChange}
        description="Must contain courses with these texts"
        placeholder="CUND9003/Canton; Ditto/NJS; Thirsty/ASP"
      />
    </div>
  );
};

export default FilterPage;
