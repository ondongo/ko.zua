// components/PartnersMarquee.tsx
import Image from "next/image";
export default function PartnersMarquee() {
  const partners = [
    { name: "KKB la joie du Congo", logo: "/partners/kkb.jpg" },
    { name: "KJB Services", logo: "/partners/kjb.png" },
    { name: "PontonShop ", logo: "/partners/pontonshop.png" },
    // Ajoute autant que tu veux
  ];

  return (
    <section className="flex items-center mt-[2rem] lg:mt-[6rem]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl lg:text-2xl  font-bold  text-gray-800 my-10">
          Nos partenaires officiels et exclusifs
        </h2>
        <div className="flex justify-center items-center">
          {/* Grille responsive avec 2 colonnes sur mobile, 4 colonnes sur PC */}

          <div className="flex flex-wrap justify-center items-center gap-10">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="relative w-[140px] h-[50px] lg:w-[220px] lg:h-[80px] overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
