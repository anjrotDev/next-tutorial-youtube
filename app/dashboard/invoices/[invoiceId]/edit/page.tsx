import FormEditWrapper from "@/app/components/FormEditWrapper";
import { fetchCustomers, fetchInvoiceById } from "@/app/helpers/api";
import { bebas } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface EditInvoiceProps {
  params: Promise<{ invoiceId: string }>;
}

const EditInvoice: FC<EditInvoiceProps> = async ({ params }) => {
  const path = await params;
  console.log("props :>> ", path.invoiceId);
  const id = path.invoiceId;
  const breadCrumbs = [
    { label: "Invoices", href: "/dashboard/invoices" },
    {
      label: "Create Invoice",
      href: `/dashboard/invoices/${id}/edit`,
      active: true
    }
  ];

  const [getCustomers, invoice] = await Promise.all([fetchCustomers(), fetchInvoiceById(id)]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumb={breadCrumbs} className={bebas.className} />
      <FormEditWrapper customers={getCustomers} invoice={invoice} />
    </main>
  );
};

export default EditInvoice;
