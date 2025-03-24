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

  const [selectedValues, setSelectedValues] = useState([]);

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

  const multiOptions = [
    { value: "1", text: "Option 1", selected: false },
    { value: "2", text: "Option 2", selected: false },
    { value: "3", text: "Option 3", selected: false },
    { value: "4", text: "Option 4", selected: false },
    { value: "5", text: "Option 5", selected: false },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Ajouter un Véhicule" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
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
      </div>
      <div className="flex justify-end mt-6">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Ajouter le véhicule
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
