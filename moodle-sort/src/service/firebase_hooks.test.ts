import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getUserLinks, addLink, deleteLink } from "./firebase_hooks";
import db from "./firebase";

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getFirestore: jest.fn(),
}));

describe("Firebase Hooks", () => {
  const userId = "testUser";
  const courseId = 123;
  const linkId = "testLink";
  const title = "Test Title";
  const url = "https://test.url";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserLinks", () => {
    it("should return an empty array if the user document does not exist", async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
      (setDoc as jest.Mock).mockResolvedValueOnce({});

      const result = await getUserLinks(userId, courseId);
      expect(getDoc).toHaveBeenCalledWith(doc(db, "users", userId));
      expect(setDoc).toHaveBeenCalledWith(
        doc(db, "users", userId),
        expect.any(Object)
      );
      expect(result).toEqual([]);
    });

    it("should return sorted links by title if links exist", async () => {
      const mockLinks = [
        { id: "2", data: () => ({ courseId, title: "B", url }) },
        { id: "1", data: () => ({ courseId, title: "A", url }) },
      ];
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => true });
      (getDocs as jest.Mock).mockResolvedValueOnce({
        forEach: (callback: any) => mockLinks.forEach((item) => callback(item)),
      });

      const result = await getUserLinks(userId, courseId);
      expect(result).toEqual([
        { id: "1", title: "A", url },
        { id: "2", title: "B", url },
      ]);
    });

    it("should handle errors gracefully", async () => {
      (getDoc as jest.Mock).mockRejectedValueOnce(new Error("Firestore error"));

      const result = await getUserLinks(userId, courseId);
      expect(result).toEqual([]);
    });
  });

  describe("addLink", () => {
    it("should add a link and return its ID", async () => {
      (addDoc as jest.Mock).mockResolvedValueOnce({ id: linkId });

      const result = await addLink(userId, courseId, title, url);
      expect(addDoc).toHaveBeenCalledWith(
        collection(db, "users", userId, "links"),
        { courseId, title, url }
      );
      expect(result).toBe(linkId);
    });

    it("should handle errors", async () => {
      (addDoc as jest.Mock).mockRejectedValueOnce(new Error("Firestore error"));

      await expect(addLink(userId, courseId, title, url)).rejects.toThrow(
        "Firestore error"
      );
    });
  });

  describe("deleteLink", () => {
    it("should delete a link successfully", async () => {
      await deleteLink(userId, linkId);
      expect(deleteDoc).toHaveBeenCalledWith(
        doc(db, "users", userId, "links", linkId)
      );
    });

    it("should handle errors gracefully", async () => {
      (deleteDoc as jest.Mock).mockRejectedValueOnce(
        new Error("Firestore error")
      );

      await expect(deleteLink(userId, linkId)).rejects.toThrow(
        "Firestore error"
      );
    });
  });
});
