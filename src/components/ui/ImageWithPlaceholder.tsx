"use client"

import { useState } from "react";
import Image from "next/image";

type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  className2?:string;
  // image placeholder dans /public (ex: icône montagne/soleil)
  placeholderSrc?: string;
};

export function ImageWithPlaceholder({
  src,
  alt,
  className,
  className2,
  placeholderSrc = "/loader.webp",
}: ImgProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full">
      {/* Placeholder visible tant que l’image n’est pas chargée */}
      {!loaded && (
        <img
          src={placeholderSrc}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover${className2 ?? ""}`}
          aria-hidden
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className ?? ""}`}
        loading="lazy"
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setLoaded(true)} 
      />
    </div>
  );
}
