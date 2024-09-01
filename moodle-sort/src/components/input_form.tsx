import { Textarea } from "@nextui-org/react";

interface Props {
  isDisabled: boolean;
  value: string | undefined;
  setValue: (value: string) => void;
  description?: string;
  placeholder?: string;
}

const InputForm = ({
  isDisabled,
  value,
  setValue,
  description,
  placeholder,
}: Props) => {
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
        isReadOnly={isDisabled}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-80"
      />
    </>
  );
};

export default InputForm;
