declare module "react-range-slider-input" {
    import { FC } from "react";
  
    export interface RangeSliderProps {
      value?: [number, number]; // Valeurs minimales et maximales sélectionnées
      min?: number; // Valeur minimale possible
      max?: number; // Valeur maximale possible
      step?: number; // Incrément des pas
      onInput?: (value: [number, number]) => void; // Handler pour le mouvement du slider
      onChange?: (value: [number, number]) => void; // Handler pour le changement final
      disabled?: boolean; // Désactiver le slider
      className?: string; // Classes CSS personnalisées
    }
  
    const RangeSlider: FC<RangeSliderProps>;
    export default RangeSlider;
  }
  