"use client";

import { Pagination } from "anjrot-components";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

const PaginationWrapper: FC<{ totalpages: number }> = ({ totalpages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return <Pagination totalPages={totalpages} currentPage={currentPage} createPageURL={createPageURL} AnchorElement={Link} />;
};

export default PaginationWrapper;
