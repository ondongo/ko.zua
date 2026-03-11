"use client";

import { useState } from "react";
import Image from "next/image";

interface TableImageSkeletonProps {
  src: string;
  alt: string;
  /** Taille du cercle (défaut: w-14 h-14) */
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
};

export function TableImageSkeleton({
  src,
  alt,
  size = "md",
  className = "",
}: TableImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false);
  const hasSrc = Boolean(src?.trim());

  return (
    <div
      className={`relative overflow-hidden border-2 border-white rounded-full flex-shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {/* Skeleton visible tant que l'image n'est pas chargée (ou pas d'image) */}
      {(!hasSrc || !loaded) && (
        <div
          className="absolute inset-0 bg-gray-300 animate-pulse rounded-full"
          aria-hidden
        />
      )}
      {hasSrc && (
        <Image
          width={size === "md" ? 56 : 40}
          height={size === "md" ? 56 : 40}
          src={src}
          alt={alt}
          className={`object-cover transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
