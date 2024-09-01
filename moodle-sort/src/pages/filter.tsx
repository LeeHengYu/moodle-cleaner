import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import InputForm from "../components/input_form";
import { debounce } from "../deboucer";

const FilterPage = () => {
  const [year, setYear] = useState<number | null>();
  const [sem, setSem] = useState<number | null>();
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

  const saveToStorageImmediate = (key: string, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Error saving ${key}:`, chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  };

  const saveToStorage = debounce(saveToStorageImmediate, 300);

  const handleYearChange = (v: string) => {
    const res = Math.max(parseInt(v) || 2020, 2020);
    setYear(res);
    saveToStorage("year", res);
  };

  const handleSemChange = (v: string) => {
    const newSem = v ? (parseInt(v) >= 2 ? 2 : 1) : null;
    setSem(newSem);
    saveToStorage("sem", newSem);
  };

  const clearYearSem = () => {
    setYear(null);
    setSem(null);
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
