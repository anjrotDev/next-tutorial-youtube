import { fetchRevenue } from "@/app/helpers/api";
import { RevenueChart } from "anjrot-components";
import React from "react";

const ChartWrapper = async () => {
  const revenue = await fetchRevenue();
  return <RevenueChart revenues={revenue} chartHeight={350} className="bg-slate-700" />;
};

export default ChartWrapper;
