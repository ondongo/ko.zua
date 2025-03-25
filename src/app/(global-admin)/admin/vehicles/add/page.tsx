"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DropzoneComponent from "@/components/ui/form/form-elements/DropZone";
import Input from "@/components/ui/form/input/InputField";
import TextArea from "@/components/ui/form/input/TextArea";
import Label from "@/components/ui/form/Label";
import MultiSelect from "@/components/ui/form/MultiSelect";
import Select from "@/components/ui/form/Select";
import Switch from "@/components/ui/form/switch/Switch";

import { useState } from "react";
const steps = [
  "Informations générales",
  "Détails du véhicule",
  "Caractéristiques & Images",
  "Validation des informations"
];

export default function AddVehicle() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
    type: "",
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    fuel: "",
    gearBox: "",
    seats: "",
    doors: "",
    distance: "",
    availability: true,
    saleStatus: "RENT",
    features: [],
    location: "",
    images: [],
  });
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const categoryOptions = [
    { value: "SUV", label: "SUV" },
    { value: "Berline", label: "Berline" },
    { value: "Coupé", label: "Coupé" },
    { value: "Camionnette", label: "Camionnette" },
  ];

  const saleStatusOptions = [
    { value: "RENT", label: "Location" },
    { value: "SALE", label: "Vente" },
  ];

  const conditionOptions = [
    { value: "Neuf", label: "Neuf" },
    { value: "Occasion", label: "Occasion" },
  ];

  const fuelOptions = [
    { value: "Essence", label: "Essence" },
    { value: "Diesel", label: "Diesel" },
    { value: "Électrique", label: "Électrique" },
    { value: "Hybride", label: "Hybride" },
  ];


  return (
    <div className="lg:mx-10">
      <PageBreadcrumb pageTitle="Ajouter un Véhicule" />

      <div className="flex items-center justify-center w-full py-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-1 items-center">
            {/* Ligne de progression */}
            {index !== 0 && (
              <div
                className={`absolute top-[28px] -left-[70%] w-full h-1 z-10  transition-all ${
                  currentStep >= index ? "bg-yellowkouzua" : "bg-gray-300"
                }`}
              />
            )}

            {/* Étape */}
            <div className="flex flex-col items-center z-30 
            px-2">
              <div
                className={`w-14 h-14 flex items-center justify-center border rounded-full  bg-white text-sm font-medium 
                ${
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

      {currentStep === 0 && (
        <Section title="Informations générales">
          <Label>Nom du véhicule</Label>
          <Input
            type="text"
            placeholder="Nom du véhicule"
            name="name"
            defaultValue={formData.name}
            onChange={handleChange}
          />

          <Label>Description</Label>
          <TextArea
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <Label>Catégorie</Label>
          <Select
            placeholder="Sélectionnez une catégorie"
            options={categoryOptions}
            defaultValue={formData.category}
            onChange={handleChange}
          />

          <Label>État</Label>
          <Select
            placeholder="Sélectionnez un état"
            options={conditionOptions}
            defaultValue={formData.condition}
            onChange={handleChange}
          />
        </Section>
      )}

      {currentStep === 1 && (
        <Section title="Détails du véhicule">
          <Label>Marque</Label>
          <Input
            placeholder="Marque"
            name="brand"
            defaultValue={formData.brand}
            onChange={handleChange}
          />
          <Label>Modèle</Label>
          <Input
            placeholder="Modèle"
            name="model"
            defaultValue={formData.model}
            onChange={handleChange}
          />

          <Label>Année</Label>
          <Input
            placeholder="Année"
            type="number"
            name="year"
            defaultValue={formData.year}
            onChange={handleChange}
          />
          <Label>Prix par jour (€)</Label>
          <Input
            placeholder="Prix par jour (€)"
            type="number"
            name="pricePerDay"
            defaultValue={formData.pricePerDay}
            onChange={handleChange}
          />
          <Label>Disponibilité</Label>
          <Switch
            label="Disponible"
            defaultChecked={formData.availability}
            onChange={handleChange}
          />
        </Section>
      )}

      {currentStep === 2 && (
        <Section title="Caractéristiques & Images">
          <Label>Carburant</Label>
          <Select
            placeholder="Sélectionnez un carburant"
            options={fuelOptions}
            defaultValue={formData.fuel}
            onChange={handleChange}
          />
          <Label>Nombre de sièges</Label>
          <Input
            placeholder="Nombre de sièges"
            type="number"
            name="seats"
            defaultValue={formData.seats}
            onChange={handleChange}
          />
          <Label>Nombre de portes</Label>
          <Input
            placeholder="Nombre de portes"
            type="number"
            name="doors"
            defaultValue={formData.doors}
            onChange={handleChange}
          />
          <Label>Kilométrage</Label>
          <Input
            placeholder="Kilométrage"
            name="distance"
            defaultValue={formData.distance}
            onChange={handleChange}
          />
          <DropzoneComponent />
        </Section>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 border rounded-md"
        >
          Précédent
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

const Section = ({ title, children }: any) => (
  <div className="space-y-4 bg-white p-6 rounded-xl shadow">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);
