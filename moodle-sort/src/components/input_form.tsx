import { Textarea } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isDisabled: boolean;
  significance: string;
  setSignificance: Dispatch<SetStateAction<string>>;
}

const description = (
  <p className="text-white text-medium font-serif text-left text-wrap max-w-[500px]">
    Priority prefixes from the highest to lowest (up to 10 items).
  </p>
);

function capitalizeAll(str: string): string {
  return str.toUpperCase();
}

const InputForm = ({ isDisabled, significance, setSignificance }: Props) => {
  return (
    <>
      {description}
      <Textarea
        label="Prefixes"
        isReadOnly={isDisabled}
        value={significance}
        onChange={(e) => setSignificance(capitalizeAll(e.target.value))}
        placeholder="e.g. FINA3, ECON, COMP2"
        className="w-80"
      ></Textarea>
    </>
  );
};

export default InputForm;
