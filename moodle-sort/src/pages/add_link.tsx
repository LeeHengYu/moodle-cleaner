import { Input } from "@nextui-org/react";
import { FormEventHandler, useEffect, useState } from "react";
import { useNextPageContext } from "../contexts/nextPage";
import {
  addLink,
  deleteLink,
  getUserLinks,
  LinkModel,
} from "../service/firebase_hooks";
import LinkBar from "../components/link_bar";
import { sendLinksToContentScript } from "../browser/custom_link_injection";
import { initializeUserId } from "../service/user_id";

const AddLinkPage = () => {
  const nextPage = useNextPageContext();

  const [links, setLinks] = useState<LinkModel[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const res = await initializeUserId();
      setUserId(res);
      return res;
    };
    const fetchLinks = async () => {
      try {
        const res = await getUserLinks(await fetchUserId());
        setLinks(res);
        sendLinksToContentScript(res);
      } catch (e) {
        console.error("Failed to fetch links:", e);
      }
    };

    fetchLinks();
  }, []);

  const isValidUrl = (url: string) => {
    try {
      return Boolean(new URL(url));
    } catch (e) {
      return false;
    }
  };

  const _onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let title = formData.get("title") as string;
    let url = formData.get("url") as string;

    e.currentTarget.reset();

    title = title.trim();
    url = url.trim();

    if (title.length === 0 || !isValidUrl(url)) return; // show error message

    try {
      const docId = await addLink(userId, title, url);
      setLinks((prevLinks) => [...prevLinks, { id: docId, title, url }]);
    } catch (e) {
      console.log(e);
    }
  };

  const _handleDelete = (id: string) => {
    try {
      deleteLink(userId, id);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    } catch (e) {
      console.log(e);
    }
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
          Note
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
        <h2 className="text-lg font-semibold">{`Added Links:`}</h2>
        {links.map((link) => (
          <LinkBar link={link} handleDelete={_handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AddLinkPage;
