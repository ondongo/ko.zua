"use client";
import { createVehicle } from "@/actions/vehicles";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DropzoneComponent from "@/components/ui/form/form-elements/DropZone";
import Input from "@/components/ui/form/input/InputField";
import TextArea from "@/components/ui/form/input/TextArea";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import Switch from "@/components/ui/form/switch/Switch";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryOptions,
  saleStatusOptions,
  conditionOptions,
  fuelOptions,
  steps,
} from "@/utils/records";
import { VehicleFormData, vehicleSchema } from "@/schemas";
import { useState } from "react";
import { AlertType } from "@/types/allType";
import AlertModal from "@/components/ui/modals/AlertModal";
import Image from "next/image";
export default function AddVehicle() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      global: false,
      condition: "",
      type: "",
      brand: "",
      model: "",
      year: 0,
      price: 0,
      discountedPrice: 0,
      fuel: "",
      gearBox: "",
      seats: 0,
      doors: 0,
      distance: "",
      availability: true,
      saleStatus: "RENT",
      features: [],
      location: "",
      images: [],
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<AlertType>("success");

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);
    setMessage("");

    try {
      const formattedData = {
        ...data,
        condition: data.condition ?? "",
        global: data.global ?? false,
        description: data.description ?? "",
        distance: data.distance ?? "",
        discountedPrice: data.discountedPrice ? data.discountedPrice : null,
        features: JSON.stringify(data.features),
        location: JSON.stringify(data.location),
        images: JSON.stringify(data.images),
        id: "",
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

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <Section title="Informations générales">
            <Label>Nom du véhicule</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }: any) => (
                <Input
                  type="text"
                  placeholder="Nom du véhicule"
                  {...field}
                  error={errors.name}
                />
              )}
            />

            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }: any) => (
                <TextArea
                  placeholder="Description"
                  {...field}
                  error={errors.description}
                />
              )}
            />

            <Label>Vente ou Location</Label>
            <Controller
              name="saleStatus"
              control={control}
              render={({ field }: any) => (
                <Select
                  placeholder="Sélectionnez un type"
                  options={saleStatusOptions}
                  {...field}
                  error={errors.saleStatus}
                />
              )}
            />

            <Label>Catégorie</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }: any) => (
                <Select
                  placeholder="Sélectionnez une catégorie"
                  options={categoryOptions}
                  {...field}
                  error={errors.category}
                />
              )}
            />

            <Label>État</Label>
            <Controller
              name="condition"
              control={control}
              render={({ field }: any) => (
                <Select
                  placeholder="Sélectionnez un état"
                  options={conditionOptions}
                  {...field}
                  error={errors.condition}
                />
              )}
            />
          </Section>
        )}

        {currentStep === 1 && (
          <Section title="Détails du véhicule">
            <Label>Marque</Label>
            <Controller
              name="brand"
              control={control}
              render={({ field }: any) => (
                <Input placeholder="Marque" {...field} error={errors.brand} />
              )}
            />
            <Label>Modèle</Label>
            <Controller
              name="model"
              control={control}
              render={({ field }: any) => (
                <Input placeholder="Modèle" {...field} error={errors.model} />
              )}
            />

            <Label>Année</Label>
            <Controller
              name="year"
              control={control}
              render={({ field }: any) => (
                <Input
                  placeholder="Année"
                  type="number"
                  {...field}
                  error={errors.year}
                />
              )}
            />
            <Label>Prix </Label>
            <Controller
              name="price"
              control={control}
              render={({ field }: any) => (
                <Input
                  placeholder="Prix"
                  type="number"
                  {...field}
                  error={errors.price}
                />
              )}
            />
            <Label>Disponibilité</Label>
            <Controller
              name="availability"
              control={control}
              render={({ field }: any) => (
                <Switch
                  label="Disponible"
                  {...field}
                  error={errors.availability}
                />
              )}
            />
          </Section>
        )}

        {currentStep === 2 && (
          <Section title="Caractéristiques & Images">
            <Label>Carburant</Label>
            <Controller
              name="fuel"
              control={control}
              render={({ field }: any) => (
                <Select
                  placeholder="Sélectionnez un carburant"
                  options={fuelOptions}
                  {...field}
                  error={errors.fuel}
                />
              )}
            />
            <Label>Nombre de sièges</Label>
            <Controller
              name="seats"
              control={control}
              render={({ field }: any) => (
                <Input
                  placeholder="Nombre de sièges"
                  type="number"
                  {...field}
                  error={errors.seats}
                />
              )}
            />
            <Label>Nombre de portes</Label>
            <Controller
              name="doors"
              control={control}
              render={({ field }: any) => (
                <Input
                  placeholder="Nombre de portes"
                  type="number"
                  {...field}
                  error={errors.doors}
                />
              )}
            />

            <Label>Images</Label>
            <Controller
              name="images"
              control={control}
              render={({ field }: any) => (
                <DropzoneComponent
                  {...field}
                  onChange={(files) => {
                    setTimeout(() => setValue("images", files), 0);
                  }}
                  error={errors.images?.message}
                />
              )}
            />
          </Section>
        )}

        {currentStep === 3 && (
          <Section title="Validation des informations">
            <div className="flex flex-col gap-2">
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Etape 1</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <p>
                <strong>Nom:</strong> {watch("name")}
              </p>
              <p className="text-ellipsis">
                <strong>Description:</strong>{" "}
                {(watch("description") || "").length > 150
                  ? (watch("description") || "").slice(0, 150) + "..."
                  : watch("description") || ""}
              </p>
              <p>
                <strong>Catégorie:</strong> {watch("category")}
              </p>

              <p>
                <strong>Statut de vente:</strong> {watch("saleStatus")}
              </p>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Etape 2</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <p>
                <strong>État:</strong> {watch("condition")}
              </p>
              <p>
                <strong>Marque:</strong> {watch("brand")}
              </p>
              <p>
                <strong>Modèle:</strong> {watch("model")}
              </p>
              <p>
                <strong>Année:</strong> {watch("year")}
              </p>
              <p>
                <strong>Prix:</strong> {watch("price")} €
              </p>
              <p>
                <strong>Disponibilité:</strong>{" "}
                {watch("availability") ? "Disponible" : "Indisponible"}
              </p>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Etape 3</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <p>
                <strong>Carburant:</strong> {watch("fuel")}
              </p>
              <p>
                <strong>Sièges:</strong> {watch("seats")}
              </p>
              <p>
                <strong>Portes:</strong> {watch("doors")}
              </p>
              <p>
                <strong>Images:</strong>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {watch("images").map((img: File, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 object-cover"
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
              type="submit"
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
