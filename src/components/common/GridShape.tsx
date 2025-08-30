import Image from "next/image";
import React from "react";

type Props = {
  className?: string; // permet d'ajouter des classes si besoin
};

export default function GridShape({ className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    >
      {/* shape en haut à droite */}
      <div className="absolute right-0 top-0 w-full max-w-[250px] xl:max-w-[450px]">
        <Image
          src="/images/shape/grid-01.svg"
          alt=""
          width={540}
          height={254}
          priority={false}
        />
      </div>

      {/* shape en bas à gauche (miroir) */}
      <div className="absolute left-0 bottom-0 w-full max-w-[250px] xl:max-w-[450px] rotate-180">
        <Image
          src="/images/shape/grid-01.svg"
          alt=""
          width={540}
          height={254}
          priority={false}
        />
      </div>
    </div>
  );
}
