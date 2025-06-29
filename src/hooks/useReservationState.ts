import { InvoiceData } from "@/types/interfaces";
import { useState } from "react";

  
export const useReservationState = () => {
    const [loadingReservation, setLoadingReservation] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [reservationType, setReservationType] = useState<"sale" | "simple" | "eclair">("simple");
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  
    return {
      loadingReservation,
      setLoadingReservation,
      modalOpen,
      setModalOpen,
      phone,
      setPhone,
      reservationType,
      setReservationType,
      success,
      setSuccess,
      name,
      setName,
      email,
      setEmail,
      invoiceData,
      setInvoiceData,
    };
  };
  