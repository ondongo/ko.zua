"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/common/tables/BasicTableOne";
import Pagination from "@/components/common/tables/Pagination";
import { useState } from "react";

import React from "react";



export default function BasicTables() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; 

  return (
    <div>
      <PageBreadcrumb pageTitle="Basic Table" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <BasicTableOne />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
