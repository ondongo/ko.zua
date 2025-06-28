import React from "react";

const Breadcrumb = ({ path, page, id }: any) => {
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
          <a className="text-yellowkouzua-dark underline" href={`/${path === 'Immobiliers' ? 'estates' : path === 'Véhicules' ? 'vehicles' : path?.toLowerCase()}`}>{breadcrumbPath}</a>
          {id && (
            <>
              &nbsp; / &nbsp; 
              <span className="text-gray-600">{id}</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default Breadcrumb;
