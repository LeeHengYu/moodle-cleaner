import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import db from "./firebase";

export interface LinkModel {
  id: string;
  title: string;
  url: string;
}

export const getUserLinks = async (userId: string): Promise<LinkModel[]> => {
  const userDocRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, { createdAt: new Date().toUTCString() });
      return [];
    }

    const querySnapshot = await getDocs(
      collection(db, "users", userId, "links")
    );
    const links: LinkModel[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      links.push({
        id: doc.id,
        title: data.title,
        url: data.url,
      });
    });
    return links;
  } catch (e) {
    return [];
  }
};

export const addLink = async (
  userId: string,
  title: string,
  url: string
): Promise<string> => {
  const docRef = await addDoc(collection(db, "users", userId, "links"), {
    title,
    url,
  });
  return docRef.id;
};

export const deleteLink = async (userId: string, linkId: string) => {
  await deleteDoc(doc(db, "users", userId, "links", linkId));
};
