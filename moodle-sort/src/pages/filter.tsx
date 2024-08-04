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

  function handleYearChange(v: string) {
    const year = parseInt(v) || undefined;
    setYear(year);
    config.filter?.setYear(parseInt(v));
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

  function handlePrefixChange(v: string) {
    setPrefixes(v);
    config.filter?.setPrefixes(v);
  }

  return (
    <div className="flex flex-col gap-3 w-full grow bg-gray-700 h-[352px]">
      {label}
      <Input
        type="number"
        size="lg"
        label="Academic Year"
        value={year?.toString() || ""}
        onValueChange={handleYearChange}
        fullWidth
      />
      <Input
        type="number"
        size="lg"
        label="Semester (only 1 or 2)"
        value={sem?.toString() || ""}
        onValueChange={handleSemChange}
        fullWidth
      />
      <InputForm
        isDisabled={false}
        value={prefixes}
        setValue={handlePrefixChange}
        description="Only courses of the entered prefixes:"
      />
    </div>
  );
};

export default FilterPage;
