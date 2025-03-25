"use client";

import React from "react";

import ComponentCard from "../../common/ComponentCard";

import { useModal } from "@/hooks/useModal";
import { Modal } from ".";

import Label from "../form/Label";

export default function FormInModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <ComponentCard title="Form In Modal">
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <form className="">
          <h4 className="mb-6 text-lg font-medium text-gray-800   ">
            Personal Information
          </h4>
        </form>
      </Modal>
    </ComponentCard>
  );
}
