"use client";
import { createVehicle } from "@/actions/vehicles";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DropzoneComponent from "@/components/ui/form/DropZone";
import Label from "@/components/ui/form/Label";

import { useForm, Controller } from "react-hook-form";
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
import { VehicleFormData, vehicleSchema } from "@/schemas";
import { useEffect, useState } from "react";
import { AlertType } from "@/types/allType";
import AlertModal from "@/components/ui/modals/AlertModal";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { z } from "zod";

export default function AddVehicle() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      condition: "",
      brand: "",
      model: "",
      year: 0,
      price: 0,
      fuel: "",
      gearBox: "",
      seats: 0,
      doors: 0,
      distance: "",
      availability: true,
      saleStatus: "RENT",
      location: "",
      images: [],
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

  const onSubmit = async () => {
    const data = getValues();
    console.log("Form data submitted:", data);
    console.log("Form data:", data);
    console.log("Form errors:", errors);
    try {
      vehicleSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(
          "Veuillez remplir tous les champs obligatoires surlignés en rouge"
        );
      }
      return;
    }

    const imageUrls =
      data.images?.map((file: any) => file.path || file.url) || [];
    setLoading(true);
    setMessage("");
    try {
      const formattedData = {
        ...data,
        condition: data.condition ?? "",
        global: false,
        description: data.description ?? "",
        distance: data.distance ?? "",
        discountedPrice: null,
        seats: data.seats ?? 0,
        doors: data.doors ?? 0,
        type: "Car",
        features: {},
        location: { city: data.location, country: "Congo" },
        images: imageUrls,
        id: uuid(),
        starCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0,
      };

      await createVehicle(formattedData);

      setModalType("success");

      setModalOpen(true);
      setMessage("Véhicule ajouté avec succès !");
    } catch (error) {
      setMessage("Erreur lors de l'ajout du véhicule.");
      setModalType("error");
    } finally {
      setLoading(false);
    }
  };


  /* ***** DropZone Manage ***** */
  const [files, setFiles] = useState<any[]>([]);

  return (
    <div className="lg:mx-10">
      <PageBreadcrumb pageTitle="Ajouter un Véhicule" />

      <div className="flex items-center justify-center w-full py-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-1 items-center">
            {index !== 0 && (
              <div
                className={`absolute top-[28px] -left-[70%] w-full h-1 z-10  transition-all ${
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

      <form>
        {currentStep === 0 && (
          <Section title="Informations générales">
            <Label>
              Nom du véhicule <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("name")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Nom du véhicule"
            />
            {errors.name && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.name?.message}</p>
              </div>
            )}

            <Label>
              Prix <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("price", {
                valueAsNumber: true,
              })}
              step={100000}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Prix"
            />
            {errors.price && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.price?.message}</p>
              </div>
            )}

            <Label>Description </Label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded"
              placeholder="Description"
              rows={4}
            />
            {errors.description && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.description?.message}</p>
              </div>
            )}

            <Label>
              Localisation <span className="text-red-500">*</span>
            </Label>
            <select
              {...register("location")}
              className="w-full p-2 border rounded"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.location && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.location?.message}</p>
              </div>
            )}

            <Label>
              Vente ou Location <span className="text-red-500">*</span>
            </Label>
            <select
              {...register("saleStatus")}
              className="w-full p-2 border rounded"
            >
              {saleStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.saleStatus && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.saleStatus?.message}</p>
              </div>
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
            {errors.category && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.category?.message}</p>
              </div>
            )}

            <Label>État</Label>
            <select
              {...register("condition")}
              className="w-full p-2 border rounded"
            >
              {conditionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.condition && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.condition?.message}</p>
              </div>
            )}
          </Section>
        )}

        {currentStep === 1 && (
          <Section title="Détails du véhicule">
            <Label>
              Marque <span className="text-red-500">*</span>
            </Label>
            <input
              {...register("brand")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Marque"
            />

            {errors.brand && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.brand?.message}</p>
              </div>
            )}
            <Label>
              Modèle <span className="text-red-500">*</span>{" "}
            </Label>
            <input
              {...register("model")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Modèle"
            />
            {errors.model && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.model?.message}</p>
              </div>
            )}

            <Label>
              Année <span className="text-red-500">*</span>{" "}
            </Label>
            <input
              {...register("year", {
                valueAsNumber: true,
              })}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Année"
            />
            {errors.year && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.year?.message}</p>
              </div>
            )}

            <Label>Kilométrage</Label>
            <input
              {...register("distance")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Kilométrage"
            />
            {errors.distance && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.distance?.message}</p>
              </div>
            )}

            <Label>Disponibilité</Label>
            <input
              {...register("availability")}
              type="checkbox"
              className="w-4 h-4"
            />
            {errors.availability && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.availability?.message}</p>
              </div>
            )}
          </Section>
        )}

        {currentStep === 2 && (
          <Section title="Caractéristiques & Images">
            <Label>
              Carburant <span className="text-red-500">*</span>{" "}
            </Label>
            <select {...register("fuel")} className="w-full p-2 border rounded">
              {fuelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p>{errors.fuel?.message}</p>

            <Label>
              Boite de vitesse <span className="text-red-500">*</span>
            </Label>
            <select
              {...register("gearBox")}
              className="w-full p-2 border rounded"
            >
              {gearBoxOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {errors.gearBox && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.gearBox?.message}</p>
              </div>
            )}

            <Label>Nombre de sièges</Label>
            <input
              {...register("seats", {
                valueAsNumber: true,
              })}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Nombre de sièges"
            />
            {errors.seats && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.seats?.message}</p>
              </div>
            )}

            <Label>Nombre de portes</Label>
            <input
              {...register("doors", {
                valueAsNumber: true,
              })}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Nombre de portes"
            />
            {errors.doors && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.doors?.message}</p>
              </div>
            )}

            <Label>
              Images <span className="text-red-500">*</span>
            </Label>
            <DropzoneComponent
              setValue={setValue}
              files={files}
              setFiles={setFiles}
            />

            {errors.images && (
              <div
                className={`rounded-md 
                 p-4  bg-error-400 text-white`}
              >
                <p>{errors.images?.message}</p>
              </div>
            )}
          </Section>
        )}
        {currentStep === 3 && (
          <Section title="Validation des informations">
            <div className="flex flex-col gap-2">
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Étape 1</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <p>
                <strong
                  className={watch("name") ? "" : "bg-red-200 max-w-auto "}
                >
                  Nom :
                </strong>{" "}
                {watch("name")}
              </p>
              <p className="text-ellipsis">
                <strong>Description :</strong>{" "}
                {(watch("description") || "").length > 150
                  ? (watch("description") || "").slice(0, 150) + "..."
                  : watch("description") || ""}
              </p>
              <p>
                <strong
                  className={watch("category") ? "" : "bg-red-200 max-w-auto "}
                >
                  Catégorie :
                </strong>{" "}
                {watch("category") || "non spécifiée"}
              </p>
              <p>
                <strong
                  className={
                    watch("saleStatus") ? "" : "bg-red-200 max-w-auto "
                  }
                >
                  Statut de vente :
                </strong>{" "}
                {watch("saleStatus") || "non spécifiée"}
              </p>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Étape 2</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <p>
                <strong>État :</strong> {watch("condition") || "Non spécifié"}
              </p>
              <p>
                <strong
                  className={watch("brand") ? "" : "bg-red-200 max-w-auto "}
                >
                  Marque :
                </strong>{" "}
                {watch("brand") || "non spécifiée"}
              </p>
              <p>
                <strong
                  className={watch("model") ? "" : "bg-red-200 max-w-auto "}
                >
                  Modèle :
                </strong>{" "}
                {watch("model") || "non spécifiée"}
              </p>
              <p>
                <strong
                  className={watch("year") ? "" : "bg-red-200 max-w-auto "}
                >
                  Année :
                </strong>{" "}
                {watch("year") || "non spécifiée"}
              </p>
              <p>
                <strong
                  className={watch("price") ? "" : "bg-red-200 max-w-auto "}
                >
                  Prix :
                </strong>{" "}
                {watch("price") || "non spécifiée"}
              </p>
              <p>
                <strong>Disponibilité :</strong>{" "}
                {watch("availability") ? "Disponible" : "Indisponible"}
              </p>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Étape 3</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <p>
                <strong
                  className={watch("fuel") ? "" : "bg-red-200 max-w-auto "}
                >
                  Carburant :
                </strong>{" "}
                {watch("fuel") || "non spécifiée"}
              </p>
              <p>
                <strong>Boîte de vitesses :</strong>{" "}
                {watch("gearBox") || "non spécifiée"}
              </p>
              <p>
                <strong>Sièges: :</strong> {watch("seats") || "non spécifiée"}
              </p>
              <p>
                <strong>Portes :</strong> {watch("doors") || "non spécifiée"}
              </p>
              <p>
                <strong>Distance parcourue :</strong>{" "}
                {watch("distance") || "Non spécifiée"}
              </p>
              <p>
                <strong
                  className={watch("fuel") ? "" : "bg-red-200 max-w-auto "}
                >
                  Emplacement :
                </strong>{" "}
                {watch("location") || "Non spécifié"}
              </p>
              <p>
                <strong>Caractéristiques :</strong>{" "}
              </p>

              <p>
                <strong
                  className={
                    watch("images")?.length > 0 ? "" : "bg-red-200 max-w-auto "
                  }
                >
                  Images:
                </strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {watch("images").map((img: File, index) => (
                  <Image
                    width={40}
                    height={40}
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Image ${index + 1}`}
                    className="object-cover"
                  />
                ))}
              </div>
            </div>
          </Section>
        )}

        <div className="flex justify-center mt-6 space-x-4 gap-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Etape précédente
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-yellowkouzua text-white rounded-md"
            >
              Etape suivant
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "En cours..." : "Soumettre"}
            </button>
          )}
        </div>

        <AlertModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
        />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const Section = ({ title, children }: any) => (
  <div className="space-y-4 bg-white p-6 rounded-xl shadow">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);
