import { DateRangeType } from "@/types/interfaces";
import { useState } from "react";

export const useDateState = () => {
  const [date, setDate] = useState<DateRangeType[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return {
    date,
    setDate,
    showDatePicker,
    setShowDatePicker,
  };
};
