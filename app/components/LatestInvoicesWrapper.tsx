import { fetchLatestInvoices } from "@/app/helpers/api";
import { LatestInvoices } from "anjrot-components";
import React from "react";

const LatestInvoicesWrapper = async () => {
  const fetchInvoices = await fetchLatestInvoices();
  return <LatestInvoices latestInvoices={fetchInvoices} className="bg-slate-700" footer={{ className: "text-white" }} />;
};

export default LatestInvoicesWrapper;
