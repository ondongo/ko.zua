"use client";
import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface RangeSliderProps {
  priceRange: { min: number; max: number };
  priceRangeHandler: (value: { min: number; max: number }) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  priceRange,
  priceRangeHandler,
}) => {
  const min = 5000;
  const max = 500000;
  
  // S'assurer que les valeurs sont dans les limites acceptables
  const validMin = Math.max(min, Math.min(max, priceRange.min || min));
  const validMax = Math.max(min, Math.min(max, priceRange.max || max));
  
  const [values, setValues] = React.useState([validMin, validMax]);

  React.useEffect(() => {
    // Mettre à jour les valeurs quand priceRange change
    const newMin = Math.max(min, Math.min(max, priceRange.min || min));
    const newMax = Math.max(min, Math.min(max, priceRange.max || max));
    setValues([newMin, newMax]);
  }, [priceRange, min, max]);

  const handleChange = (newValues: number[]) => {
    // S'assurer que les nouvelles valeurs sont valides
    const validValues = [
      Math.max(min, Math.min(max, newValues[0])),
      Math.max(min, Math.min(max, newValues[1]))
    ];
    setValues(validValues);
    priceRangeHandler({ min: validValues[0], max: validValues[1] });
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="h-6 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
        <div className="flex justify-between mt-2">
          <div className="h-4 w-12 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full max-w-md">
        <Range
          values={values}
          step={5000}
          min={min}
          max={max}
          onChange={handleChange}
          renderTrack={({ props, children }: any) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#d3d3d3", "#0A3D62", "#d3d3d3"],
                  min,
                  max,
                }),
              }}
              className="relative"
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => {
            const { key, ...restProps } = props; // Extraction de `key`
            return (
              <div
                key={key} // Ajout explicite de la clé
                {...restProps} // Propagation des autres props
                className={`SliderThumb ${
                  isDragged ? "outline-none" : ""
                } focus:outline-none`}
              />
            );
          }}
        />
      </div>

      <div className="flex justify-between w-full max-w-md">
        <span className="text-sm text-gray-500">{values[0].toLocaleString()} fcfa</span>
        <span className="text-sm text-gray-500">{values[1].toLocaleString()} fcfa</span>
      </div>
    </div>
  );
};

export default RangeSlider;
