import { Textarea } from "@nextui-org/react";

interface Props {
  value?: string;
  setValue: (value: string) => void;
  description?: string;
  placeholder?: string;
}

const InputForm = ({ description, placeholder, setValue, value }: Props) => {
  const upperDescription = (
    <p className="text-black text-medium font-serif text-left text-wrap max-w-[500px]">
      {description}
    </p>
  );
  return (
    <>
      {upperDescription}
      <Textarea
        color="default"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-80"
      />
    </>
  );
};

export default InputForm;
