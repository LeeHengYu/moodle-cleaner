import { Input } from "@nextui-org/react";
import { useState } from "react";
import InputForm from "../components/input_form";
import { FilterParam } from "../models/configuration";

interface Props {
  filterParam?: FilterParam;
}

const FilterPage = ({ filterParam }: Props) => {
  const label = (
    <p className="text-white flex font-semibold text-xl">Filters</p>
  );
  const [year, setYear] = useState(filterParam?.year);
  const [sem, setSem] = useState(filterParam?.sem);
  const [prefixes, setPrefixes] = useState(filterParam?.prefixes);
  return (
    <div className="flex flex-col gap-3 w-full grow bg-gray-700 h-[350px]">
      {label}
      <Input
        type="number"
        size="lg"
        label="Academic Year"
        value={year?.toString() || ""}
        onValueChange={(v) => setYear(parseInt(v) || undefined)}
        fullWidth
      />
      <Input
        type="number"
        size="lg"
        label="Semester (only 1 or 2)"
        value={sem?.toString() || ""}
        onValueChange={(v) => {
          if (v) {
            if (v.length > 0 && parseInt(v) >= 2) setSem(2);
            else setSem(1);
          } else {
            setSem(undefined);
          }
        }}
        fullWidth
      />
      <InputForm
        isDisabled={false}
        value={prefixes}
        setValue={setPrefixes}
        description="Only courses with prefixes:"
      />
    </div>
  );
};

export default FilterPage;
