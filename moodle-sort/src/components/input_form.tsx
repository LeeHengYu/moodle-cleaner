import { Textarea } from "@nextui-org/react";

interface Props {
  isDisabled: boolean;
  significance: string | undefined;
  setSignificance: (value: string) => void;
}

const description = (
  <p className="text-white text-medium font-serif text-left text-wrap max-w-[500px]">
    Prefixes from high to low prioirty:
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
        color={isDisabled ? "default" : "primary"}
        label="Prefixes"
        isReadOnly={isDisabled}
        value={significance || ""}
        onChange={(e) => setSignificance(capitalizeAll(e.target.value))}
        placeholder="e.g. FINA3, ECON, COMP2"
        className="w-80"
      ></Textarea>
    </>
  );
};

export default InputForm;
