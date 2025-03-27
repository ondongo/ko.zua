import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const DropzoneComponent = ({ setValue, files, setFiles }: any) => {
  // Fonction pour gérer les fichiers déposés
  const handleDrop = (acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 4) {
      toast.error("Vous ne pouvez télécharger que 4 fichiers maximum.");
      return;
    }

    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prevFiles: any) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      // Mettre à jour le champ 'images' du formulaire
      setValue(
        "images",
        updatedFiles.map((f) => f.file)
      );
      return updatedFiles;
    });
  };

  // Fonction pour supprimer un fichier
  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_: any, i: any) => i !== index);
    setFiles(updatedFiles);
    setValue(
      "images",
      updatedFiles.map((f: any) => f.file)
    );
  };

  // Configuration de react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    maxFiles: 4,
  });

  // Nettoyage des URLs des fichiers après usage
  useEffect(() => {
    return () => {
      files.forEach((fileObj: any) => URL.revokeObjectURL(fileObj.preview));
    };
  }, [files]);

  return (
    <div>
      {/* Zone de drop */}
      <div
        className="transition border border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-yellowkouzua py-8"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="dz-message flex flex-col items-center m-0!">
          {/* Conteneur de l'icône */}
          <div className="mb-[22px] flex justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700">
              <svg
                className="fill-current"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                />
              </svg>
            </div>
          </div>

          {/* Contenu textuel */}
          <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl">
            {isDragActive
              ? "Déposez les fichiers ici"
              : "Glissez & Déposez vos fichiers ici"}
          </h4>

          <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700">
            Glissez et déposez vos images PNG, JPG, WebP, SVG ici ou parcourez
          </span>

          <span className="font-medium underline text-theme-sm text-yellowkouzua">
            Parcourir le fichier
          </span>
        </div>
      </div>

      {/* Liste des fichiers */}
      <div>
        <h5 className="my-5">Fichiers sélectionnés :</h5>
        <div className="flex flex-col gap-4">
          {files.map((fileObj: any, index: number) => (
            <div key={index} className="flex flex-row gap-4 items-center">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  width={40}
                  height={40}
                  src={fileObj.preview}
                  alt={fileObj.file.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p>{fileObj.file.name}</p>
              <button
                onClick={() => handleRemoveFile(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropzoneComponent;
