import { Radio, RadioGroup } from "@nextui-org/react";
import { useState } from "react";
import InputForm from "../components/input_form";

/*
Sorting
alphabetical (default)
by year and sem
Reverse

self-define value (up to 10 items)
*/
const CardComponent = () => {
  const [sortKey, setSortKey] = useState("code");
  const [significance, setSignificance] = useState("");

  const label = (
    <p className="text-white font-semibold flex flex-start">Sort by</p>
  );

  const keyButtons = (
    <RadioGroup label={label} onValueChange={setSortKey}>
      <Radio
        value="code"
        className="text-left"
        description="Sort by course code in alphabetical order"
        defaultChecked
      >
        <p className="text-white font-serif">Course Code</p>
      </Radio>
      <Radio
        value="time"
        className="text-left"
        description="Sort by enrolment semester in reverse chronological order"
      >
        <p className="text-white font-serif">Year/Sem</p>
      </Radio>
      <Radio value="sig" description="">
        <p className="text-white text-left font-serif">
          Self-defined significance
        </p>
      </Radio>
    </RadioGroup>
  );

  return (
    <div className="flex flex-col gap-3">
      {keyButtons}
      <InputForm
        isDisabled={sortKey !== "sig"}
        significance={significance}
        setSignificance={setSignificance}
      />
    </div>
  );
};

export default CardComponent;
