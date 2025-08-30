import { storage } from "@/firebase/storage";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const uploadImagesToFirebase = async (
  files: File[],
  id: string,
  category: "vehicles" | "properties"
) => {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const storageRef = ref(storage, `${category}/${id}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    uploadedUrls.push(downloadURL);
  }

  return uploadedUrls;
};

export const deleteImageFromFirebase = async (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    console.log(`✅ Image supprimée : ${imageUrl}`);
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression de l'image :`, error);
  }
};

export const imageLoader = ({ src, width, quality }: any) => {
  return `/loader.webp?w=${width}&q=${quality || 75}`;
};
