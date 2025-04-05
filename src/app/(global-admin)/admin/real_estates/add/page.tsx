"use client";
import { createVehicle } from "@/actions/vehicles";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DropzoneComponent from "@/components/ui/form/DropZone";
import Label from "@/components/ui/form/Label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryOptions,
  saleStatusOptions,
  conditionOptions,
  fuelOptions,
  steps,
  gearBoxOptions,
  locationOptions,
} from "@/utils/records";
import { ImmobilierFormData, immobilierSchema } from "@/schemas";
import { useEffect, useState } from "react";
import { AlertType } from "@/types/allType";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { z } from "zod";
import { uploadImagesToFirebase } from "@/utils/functions";
import Error from "@/components/Error";
import { createOrUpdateRealEstate } from "@/actions/realEstates";
import { Modal } from "@/components/ui/modals";
import AlertModal from "@/components/ui/modals/AlertModal";
export default function AddImmobilier() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(immobilierSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      type: "",
      price: 0,
      availability: true,
      saleStatus: "RENT",
      city: "",
      neighborhood: "",
      bedrooms: undefined,
      bathrooms: undefined,
      surface: "",
      furnished: false,
      images: [] as { file: File; preview: string }[],
    },
    mode: "all",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<AlertType>("success");
  const [files, setFiles] = useState<any[]>([]);

  const onSubmit = async () => {
    const data = getValues();
    console.log("Form data submitted:", data);
    try {
      immobilierSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(
          "Veuillez remplir tous les champs obligatoires surlignés en rouge"
        );
      }
      return;
    }

    const immobilierId = uuid();
    let imageUrls: string[] = [];
    setLoading(true);

    const newImages = data.images.filter(
      (img): img is { file: File; preview: string } => img.file instanceof File
    );
    try {
      const newImageFiles: File[] = newImages.map((img) => img.file);
      imageUrls = await uploadImagesToFirebase(
        newImageFiles,
        immobilierId,
        "properties"
      );
    } catch (error) {
      toast.error("Erreur lors du téléversement des images.");
      setLoading(false);
      return;
    }

    setMessage("");
    try {
      const formattedData = {
        id: immobilierId,
        name: data.name,
        category: data.category, // Type (ex : terrain, maison, appartement)
        description: data.description || "",
        type: data.type || "", // Type (ex : terrain, maison, appartement)
        createdAt: new Date(),
        saleStatus: data.saleStatus,
        location: {
          city: data.city || "",
          neighborhood: data.neighborhood || "",
        },
        price: data.price,
        features: {
          ...(data.bedrooms !== null &&
            data.bedrooms !== undefined && { bedrooms: data.bedrooms }),
          ...(data.bathrooms !== null &&
            data.bathrooms !== undefined && { bathrooms: data.bathrooms }),
          ...(data.surface !== null &&
            data.surface !== undefined && { surface: data.surface }),
          ...(data.furnished !== null &&
            data.furnished !== undefined && { furnished: data.furnished }),
        },
        images: imageUrls,
        availability: data.availability,
        starCount: 0,
        rooms: data.bedrooms || 0,
        parcelSize: data.surface || 0,
      };
      //await createOrUpdateRealEstate(formattedData);
      setModalType("success");
      setModalOpen(true);
      setMessage("Propriété ajoutée avec succès !");
      reset();
      setCurrentStep(0);
    } catch (error) {
      setMessage("Erreur lors de l'ajout de la propriété.");
      setModalType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mx-10">
      <PageBreadcrumb pageTitle="Ajouter une propriété" />

      <div className="flex items-center justify-center w-full py-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-1 items-center">
            {index !== 0 && (
              <div
                className={`absolute top-[28px] -left-[70%] w-full h-1 z-10 transition-all ${
                  currentStep >= index ? "bg-yellowkouzua" : "bg-gray-300"
                }`}
              />
            )}
            <div className="flex flex-col items-center z-30 px-2">
              <div
                className={`w-14 h-14 flex items-center justify-center border rounded-full bg-white text-sm font-medium ${
                  currentStep >= index
                    ? "border-yellowkouzua text-yellowkouzua"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep >= index
                    ? "text-yellowkouzua font-medium"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <Section title="Informations générales">
            <Label>
              Nom de la propriété <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("name")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Nom de la propriété"
            />
            {errors.name && <Error message={errors.name?.message} />}

            <Label>
              Prix <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("price", { valueAsNumber: true })}
              step={100000}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Prix"
            />
            {errors.price && <Error message={errors.price?.message} />}

            <Label>Description</Label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded"
              placeholder="Description"
              rows={4}
            />
            {errors.description && (
              <Error message={errors.description?.message} />
            )}

            <Label>
              Catégorie <span className="text-red-500">*</span>
            </Label>
            <select
              {...register("category")}
              className="w-full p-2 border rounded"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.category && <Error message={errors.category?.message} />}
          </Section>
        )}

        {currentStep === 1 && (
          <Section title="Détails de la propriété">
            <Label>
              Surface <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("surface")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Surface"
            />
            {errors.surface && <Error message={errors.surface?.message} />}

            <Label>
              Nombre de chambres <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("bedrooms", { valueAsNumber: true })}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Nombre de chambres"
            />
            {errors.bedrooms && <Error message={errors.bedrooms?.message} />}

            <Label>
              Nombre de salles de bain <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("bathrooms", { valueAsNumber: true })}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Nombre de salles de bain"
            />
            {errors.bathrooms && <Error message={errors.bathrooms?.message} />}
          </Section>
        )}

        {currentStep === 2 && (
          <Section title="Caractéristiques & Images">
            <Label>Disponibilité</Label>
            <input
              {...register("availability")}
              type="checkbox"
              className="w-4 h-4"
            />
            {errors.availability && (
              <Error message={errors.availability?.message} />
            )}

            <Label>Fournie meublée ?</Label>
            <input
              {...register("furnished")}
              type="checkbox"
              className="w-4 h-4"
            />

            <Label>Images</Label>
            <DropzoneComponent
              setFiles={setFiles}
              files={files}
              setValue={setValue}
            />

            {errors.images && <Error message={errors.images?.message} />}
          </Section>
        )}

        <div className="flex justify-between">
          <button type="button" onClick={prevStep} disabled={currentStep === 0}>
            Précédent
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            Suivant
          </button>
          {currentStep === steps.length - 1 && (
            <button type="submit" disabled={loading}>
              {loading ? "Chargement..." : "Soumettre"}
            </button>
          )}
        </div>
      </form>

      <AlertModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </div>
  );
}

const Section = ({ title, children }: any) => (
  <div className="space-y-4 bg-white p-6 rounded-xl shadow">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);
