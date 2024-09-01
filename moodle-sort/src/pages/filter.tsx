import { Input } from "@nextui-org/react";
import { useState } from "react";
import InputForm from "../components/input_form";
import { UserConfiguration } from "../models/configuration";

interface Props {
  config: UserConfiguration;
}

const FilterPage = ({ config }: Props) => {
  const label = (
    <p className="flex font-semibold text-xl text-black">Filters</p>
  );
  const [year, setYear] = useState(config.filter?.year);
  const [sem, setSem] = useState(config.filter?.sem);
  const [prefixes, setPrefixes] = useState(config.filter?.prefixes);
  const [mustContain, setMustContain] = useState("");

  function handleYearChange(v: string) {
    let res = parseInt(v) || undefined;
    if (res != undefined) {
      if (res < 2020) {
        res = 2020;
      }
    }
    setYear(res);
  }

  function handleSemChange(v: string) {
    if (v) {
      if (v.length > 0 && parseInt(v) >= 2) {
        setSem(2);
        config.filter?.setSem(2);
      } else {
        setSem(1);
        config.filter?.setSem(1);
      }
    } else {
      setSem(undefined);
      config.filter?.setSem();
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full grow bg-gray-700 h-[352px]">
      {label}
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
        setValue={setPrefixes}
        description="Show only courses with prefixes"
        placeholder="FINA3; ECON; COMP2"
      />
      <InputForm
        isDisabled={false}
        value={mustContain}
        setValue={setMustContain}
        description="Must contain courses with these texts"
        placeholder="CUND9003/Canton; Ditto/NJS; Thirsty/ASP"
      />
    </div>
  );
};

export default FilterPage;
