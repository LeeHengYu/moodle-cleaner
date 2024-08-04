import { Radio, RadioGroup } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import InputForm from "../components/input_form";
import { UserConfiguration } from "../models/configuration";

interface Props {
  config: UserConfiguration;
}

const CardComponent = ({ config }: Props) => {
  const label = (
    <p className="text-white flex font-semibold text-xl">Sort by</p>
  );

  const [key, setKey] = useState(config.sortingKey.key);
  const [significance, setSignificance] = useState(
    config.sortingKey.userSignificance
  );

  function handleKeyChange(e: ChangeEvent<HTMLInputElement>) {
    setKey(e.target.value);
    config.sortingKey.setKey(e.target.value);
  }

  function handleSignificanceChange(v: string) {
    setSignificance(v);
    config.sortingKey.setUserSignificance(v);
  }

  const keyButtons = (
    <RadioGroup label={label} value={key} onChange={handleKeyChange}>
      <Radio
        value="alphabetical"
        className="text-left"
        description="Sort by course code in alphabetical order"
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
      <Radio value="user-defined" description="">
        <p className="text-white text-left font-serif">
          User-defined significance
        </p>
      </Radio>
    </RadioGroup>
  );

  return (
    <div className="flex flex-col gap-3 w-full h-[350px]">
      {keyButtons}
      <InputForm
        isDisabled={key !== "user-defined"}
        value={significance}
        setValue={handleSignificanceChange}
        description="Prefixes from high to low prioirty:"
      />
    </div>
  );
};

export default CardComponent;
