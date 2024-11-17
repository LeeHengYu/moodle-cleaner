import { Input } from "@nextui-org/react";
import { FormEventHandler, useState } from "react";
import { useNextPageContext } from "../contexts/nextPage";

const AddLinkPage = () => {
  const [links, setLinks] = useState<{ title: string; url: string }[]>([]);
  const nextPage = useNextPageContext();

  const _onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;

    setLinks((prevLinks) => [...prevLinks, { title, url }]);
    e.currentTarget.reset();
  };

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
      <form className="flex w-full flex-wrap gap-4" onSubmit={_onSubmit}>
        <Input
          label="Title"
          placeholder="Enter the name"
          name="title"
          required
        />
        <Input label="Url" placeholder="Enter the url" name="url" required />
        <button
          type="submit"
          className="py-2 px-4 w-full bg-sky-400 text-white rounded-lg"
          aria-label="submit-form"
        >
          Add
        </button>
      </form>
      <div className="h-4 w-full" />
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Added Links:</h2>
        <ul className="list-disc ml-5">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xl font-bold"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddLinkPage;
