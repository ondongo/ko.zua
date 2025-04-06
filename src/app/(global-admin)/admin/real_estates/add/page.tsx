"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DropzoneComponent from "@/components/ui/form/DropZone";
import Label from "@/components/ui/form/Label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  steps,
  categoriesRealEstate,
  typesRealEstate,
  stepsRealEstate,
  saleStatusOptions,
  locationOptions,
  quartiersPointeNoire,
  quartiersBrazzaville,
} from "@/utils/records";
import Image from "next/image";
import { immobilierSchema } from "@/schemas";
import { useState } from "react";
import { AlertType } from "@/types/allType";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { z } from "zod";
import { uploadImagesToFirebase } from "@/utils/functions";
import Error from "@/components/Error";
import AlertModal from "@/components/ui/modals/AlertModal";
import { createOrUpdateRealEstate } from "@/actions/realEstates";
export default function AddImmobilier() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
    watch,
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
      parcelSize: 0,
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

        // Informations principales
        name: data.name,
        description: data.description || "",
        category: data.category,
        type: data.type || "",

        // Statut
        saleStatus: data.saleStatus,
        availability: data.availability,

        // Localisation
        location: {
          city: data.city || "",
          neighborhood: data.neighborhood || "",
          country: "Congo",
        },

        // Prix
        price: data.price,
        discountedPrice: 0,

        // Détails du bien
        bedrooms: data.bedrooms ?? 0,
        bathrooms: data.bathrooms ?? 0,
        furnished: data.furnished ?? false,
        rooms: data.bedrooms ?? 0, // Tu peux ajuster selon ta logique de calcul de rooms
        parcelSize: data.parcelSize ?? 0,

        // Visuels
        images: imageUrls || [],

        // Métriques
        starCount: 0,
        views: 0,

        // Dates
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await createOrUpdateRealEstate(formattedData);
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

  const category = watch("category");

  return (
    <div className="lg:mx-10">
      <PageBreadcrumb pageTitle="Ajouter une propriété" />

      <div className="flex items-center justify-center w-full py-6">
        {stepsRealEstate.map((step, index) => (
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

      <form>
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
              {categoriesRealEstate.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.category && <Error message={errors.category?.message} />}

            <Label>Type</Label>
            <select {...register("type")} className="w-full p-2 border rounded">
              {typesRealEstate.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

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
          </Section>
        )}

        {currentStep === 1 && (
          <Section title="Détails de la propriété">
            <Label>Ville</Label>
            <select {...register("city")} className="w-full p-2 border rounded">
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Label>Quartier</Label>
            <select
              {...register("neighborhood")}
              className="w-full p-2 border rounded"
            >
              {watch("city") === "Pointe-Noire" &&
                quartiersPointeNoire.map((quartier) => (
                  <option key={quartier} value={quartier}>
                    {quartier}
                  </option>
                ))}

              {watch("city") === "Brazzaville" &&
                quartiersBrazzaville.map((quartier) => (
                  <option key={quartier} value={quartier}>
                    {quartier}
                  </option>
                ))}
            </select>

            {category === "Land" && (
              <>
                <Label>Surface</Label>
                <input
                  {...register("parcelSize", { valueAsNumber: true })}
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Surface en m²"
                />
              </>
            )}

            {category === "House" && (
              <>
                <Label>Nombre de pièces</Label>
                <input
                  {...register("rooms", { valueAsNumber: true })}
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Nombre de pièces"
                />

                <Label>Nombre de chambres</Label>
                <input
                  {...register("bedrooms", { valueAsNumber: true })}
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Nombre de chambres"
                />

                <Label>Nombre de salles de bain</Label>
                <input
                  {...register("bathrooms", { valueAsNumber: true })}
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Nombre de salles de bain"
                />

                <Label>Fournie meublée ?</Label>
                <input
                  {...register("furnished")}
                  type="checkbox"
                  className="w-4 h-4"
                />
              </>
            )}

            <Label>Disponibilité</Label>
            <input
              {...register("availability")}
              type="checkbox"
              className="w-4 h-4"
            />
            {errors.availability && (
              <Error message={errors.availability?.message} />
            )}
          </Section>
        )}

        {currentStep === 2 && (
          <Section title="Caractéristiques & Images">
            <Label>Images</Label>
            <DropzoneComponent
              setFiles={setFiles}
              files={files}
              setValue={setValue}
            />

            {errors.images && <Error message={errors.images?.message} />}
          </Section>
        )}

        {currentStep === 3 && (
          <Section title="Validation des informations">
            <div className="flex flex-col gap-4">
              {/* Étape 1 */}
              <Separator label="Étape 1 : Informations générales" />

              <DisplayItem label="Nom" value={watch("name")} />

              <DisplayItem
                label="Prix"
                value={
                  watch("price") ? `${watch("price")} FCFA` : "Non spécifié"
                }
              />
              <DisplayItem
                label="Description"
                value={
                  watch("description")
                    ? watch("description")!.slice(0, 150) +
                      (watch("description")!.length > 150 ? "..." : "")
                    : "Non spécifiée"
                }
              />

              <DisplayItem
                label="Catégorie"
                value={watch("category") || "Non spécifiée"}
              />
              <DisplayItem
                label="Statut de vente"
                value={
                  watch("saleStatus") === "RENT"
                    ? "Location"
                    : watch("saleStatus") === "SALE"
                    ? "Vente"
                    : "Non spécifié"
                }
              />
              <DisplayItem
                label="Type"
                value={watch("type") || "Non spécifié"}
              />

              {/* Étape 2 */}
              <Separator label="Étape 2 : Détails de la propriété" />

              <DisplayItem
                label="Ville"
                value={watch("city") || "Non spécifiée"}
              />

              <DisplayItem
                label="Quartier"
                value={watch("neighborhood") || "Non spécifié"}
              />
              <DisplayItem
                label="Disponibilité"
                value={watch("availability") ? "Disponible" : "Indisponible"}
              />

              {watch("category") === "Land" && (
                <DisplayItem
                  label="Surface"
                  value={
                    watch("parcelSize")
                      ? `${watch("parcelSize")} m²`
                      : "Non spécifiée"
                  }
                />
              )}

              {watch("category") === "House" && (
                <>
                  <DisplayItem
                    label="Nombre de pièces"
                    value={watch("rooms") || "Non spécifié"}
                  />
                  <DisplayItem
                    label="Chambres"
                    value={watch("bedrooms") || "Non spécifié"}
                  />
                  <DisplayItem
                    label="Salles de bain"
                    value={watch("bathrooms") || "Non spécifié"}
                  />
                  <DisplayItem
                    label="Meublé"
                    value={watch("furnished") ? "Oui" : "Non"}
                  />
                </>
              )}

              {/* Étape 3 */}
              <Separator label="Étape 3 : Images" />
              <div>
                <p className="font-semibold">Images :</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {files.length > 0 ? (
                    files.map((img: any, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded overflow-hidden"
                      >
                        <Image
                          src={img.preview}
                          width={64}
                          height={64}
                          alt={`Image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-red-500">Aucune image sélectionnée</p>
                  )}
                </div>
              </div>
            </div>
          </Section>
        )}

        <div className="flex justify-center mt-6 space-x-4 gap-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-yellowkouzua text-white rounded-md"
            >
              Etape précédente
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-yellowkouzua text-white rounded-md"
            >
              Etape suivante
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
              {loading ? <div className="spinner"></div> : <>Soumettre</>}
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

const DisplayItem = ({ label, value }: { label: string; value: any }) => (
  <p>
    <strong className={!value ? "bg-red-200 px-1 rounded" : ""}>
      {label} :
    </strong>{" "}
    {value || "Non spécifié"}
  </p>
);

const Separator = ({ label }: { label: string }) => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="mx-4 text-gray-500">{label}</span>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
);
