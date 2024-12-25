import { deleteInvoice } from "@/app/helpers/actions";
import { fetchFilteredInvoices } from "@/app/helpers/api";
import { InvoiceTable } from "anjrot-components";
import Image from "next/image";
import { FC } from "react";

interface InvoiceWrapperProps {
  query?: string;
  page?: number;
}

const InvoiceWrapper: FC<InvoiceWrapperProps> = async ({ query, page }) => {
  console.log("query :>> ", query);
  const getInvoices = await fetchFilteredInvoices(query || "", page);
  return (
    <InvoiceTable
      invoices={getInvoices}
      ImgComponent={Image}
      className="bg-slate-700"
      tableHeader={{ className: "text-white" }}
      deleteAction={deleteInvoice}
    />
  );
};

export default InvoiceWrapper;
