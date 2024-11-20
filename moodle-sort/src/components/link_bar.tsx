import { LinkModel } from "../service/firebase_hooks";

interface Props {
  link: LinkModel;
}

const LinkBar = ({ link }: Props) => {
  const onDelete = (id: string) => {
    console.log(`delete ${id}`);
  }; // implement db write in

  return (
    <div className="flex items-center justify-between w-full">
      <a
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-xl font-bold"
      >
        {link.title}
      </a>
      <button
        onClick={() => onDelete(link.id)}
        aria-label="Delete link"
        className="bg-transparent text-md font-bold p-2 hover:bg-red-100 rounded"
      >
        X
      </button>
    </div>
  );
};

export default LinkBar;
