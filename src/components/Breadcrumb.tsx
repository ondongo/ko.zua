import React from "react";

const Breadcrumb = ({ path, page }: any) => {
  const breadcrumbPath = path || "Accueil / Véhicules";
  const breadcrumbPage = page || "Accueil";
  return (
    <section className="breadcrumb-section">
      {/* Circles Animation */}
      <ul className="circles">
        {[...Array(8)].map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>

      {/* Breadcrumb Content */}
      <div className="breadcrumb-content">
        <h1 className="text-2xl font-bold text-[#111828]">{breadcrumbPage}</h1>
        <p className="text-sm text-gray-600">
          <a className="text-yellowkouzua-dark underline" href="/">Accueil</a>  &nbsp; / &nbsp; 
          {breadcrumbPath}
        </p>
      </div>
    </section>
  );
};

export default Breadcrumb;
