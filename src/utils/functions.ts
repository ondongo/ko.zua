import { storage } from "@/firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImagesToFirebase = async (files: File[], id: string, category: "vehicles" | "properties") => {
    const uploadedUrls: string[] = [];
  
    for (const file of files) {
      const storageRef = ref(storage, `${category}/${id}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedUrls.push(downloadURL);
    }
  
    return uploadedUrls;
  };
  