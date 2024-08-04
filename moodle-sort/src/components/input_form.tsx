import { Textarea } from "@nextui-org/react";

interface Props {
  isDisabled: boolean;
  value: string | undefined;
  setValue: (value: string) => void;
  description?: string;
}

function capitalizeAll(str: string): string {
  return str.toUpperCase();
}

const InputForm = ({ isDisabled, value, setValue, description }: Props) => {
  const upperDescription = (
    <p className="text-black text-medium font-serif text-left text-wrap max-w-[500px]">
      {description}
    </p>
  );
  return (
    <>
      {upperDescription}
      <Textarea
        color={isDisabled ? "default" : "primary"}
        label="Prefixes"
        isReadOnly={isDisabled}
        value={value || ""}
        onChange={(e) => setValue(capitalizeAll(e.target.value))}
        placeholder="e.g. FINA3, ECON, COMP2"
        className="w-80"
      ></Textarea>
    </>
  );
};

export default InputForm;
