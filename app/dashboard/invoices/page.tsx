import InvoiceWrapper from "@/app/components/InvoiceWrapper";
import PaginationWrapper from "@/app/components/PaginationWrapper";
import Search from "@/app/components/Search";
import { InvoiceSkeleton } from "@/app/components/Skeleton";
import { fetchInvoicesPages } from "@/app/helpers/api";
import { bebas } from "@/app/ui/fonts";
import { TableButtons } from "anjrot-components";
import Link from "next/link";
import { FC, Suspense } from "react";

interface InvoicesProps {
  searchParams?: Promise<{ query?: string; page?: number }>;
}

const Invoices: FC<InvoicesProps> = async ({ searchParams }) => {
  const params = await searchParams;

  const totalPages = await fetchInvoicesPages(params?.query || "");

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${bebas.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
        <TableButtons ButtonType={Link} title="Create Invoice" href="/dashboard/invoices/create" />
      </div>
      <Suspense fallback={<InvoiceSkeleton />}>
        <InvoiceWrapper query={params?.query} page={params?.page} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <PaginationWrapper totalpages={totalPages} />
      </div>
    </div>
  );
};

export default Invoices;
