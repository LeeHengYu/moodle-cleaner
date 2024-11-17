import { Input } from "@nextui-org/react";

interface Props {
  nextPage: () => void;
}

const AddLinkPage = ({ nextPage }: Props) => {
  return (
    <div className="gap-6">
      <div className="flex justify-between items-center w-full gap-4">
        <p className="font-semibold text-xl text-black">Manage Links</p>
        <button
          onClick={nextPage}
          className="py-1 px-3 text-white rounded-full"
          aria-label="next-page"
        >
          Filter
        </button>
      </div>
      <div className="h-4 w-full" />
      <div className="flex w-full flex-wrap gap-4">
        <Input label="Title" placeholder="Enter the name" />
        <Input label="Url" placeholder="Enter the url" />
      </div>
    </div>
  );
};

export default AddLinkPage;
