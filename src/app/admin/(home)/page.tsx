import type { Metadata } from "next";
import React from "react";
import DemographicCard from "@/components/metrics/DemographicCard";
import MonthlySalesChart from "@/components/metrics/MonthlySalesChart";
import MonthlyTarget from "@/components/metrics/MonthlyTarget";
import { SimpleMetrics } from "@/components/metrics/SimpleMetrics";
import StatisticsChart from "@/components/metrics/StatisticsChart";
import RecentReservations from "@/components/metrics/RecentReservations";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Page() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <SimpleMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentReservations />
      </div>
    </div>
  );
}
