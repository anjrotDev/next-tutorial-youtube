import { authHeaders } from "@/app/helpers/utils";
import { auth } from "@/auth";

export const fetchCardData = async () => {
  const session = await auth();
  console.log("session fetchCardData:>> ", session?.user?.token);
  try {
    const [getCustomerCount, getInvoicesCount, getInvoicesStatusCount] = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/customer/count`, {
        headers: authHeaders(session?.user?.token)
      }),
      fetch(`${process.env.BACKEND_URL}/invoices/count`, {
        headers: authHeaders(session?.user?.token)
      }),
      fetch(`${process.env.BACKEND_URL}/invoices/status-count`, {
        headers: authHeaders(session?.user?.token)
      })
    ]);

    const resultCustomerCount = await getCustomerCount.json();
    const resultInvoicesCount = await getInvoicesCount.json();
    const resultInvoicesStatusCount = await getInvoicesStatusCount.json();

    const numberOfInvoices = Number(resultInvoicesCount ?? "0");
    const numberOfCustomers = Number(resultCustomerCount ?? "0");
    const totalPaidInvoices = resultInvoicesStatusCount.paid ?? "0";
    const totalPendingInvoices = resultInvoicesStatusCount.pending ?? "0";

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices
    };
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch card data.");
  }
};

export const fetchRevenue = async () => {
  const session = await auth();
  try {
    const fetchRevenue = await fetch(`${process.env.BACKEND_URL}/revenues`, {
      headers: authHeaders(session?.user?.token)
    });
    const revenueResult = await fetchRevenue.json();
    console.log("Fetching Revenue data...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Data completed after 3 seconds.");

    return revenueResult;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch fetchRevenue data.");
  }
};

export const fetchLatestInvoices = async () => {
  const session = await auth();
  try {
    const fetchInvoices = await fetch(`${process.env.BACKEND_URL}/invoices`, {
      headers: authHeaders(session?.user?.token)
    });
    const resultFetchInvoices = await fetchInvoices.json();

    return resultFetchInvoices;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch fetchLatestInvoices data.");
  }
};

export const fetchFilteredInvoices = async (query?: string, currentPage?: number) => {
  const session = await auth();
  try {
    const fetchFilteredInvoices = await fetch(`${process.env.BACKEND_URL}/invoices/paginate?q=${query}&page=${currentPage}`, {
      headers: authHeaders(session?.user?.token)
    });
    console.log("fetchFilteredInvoices :>> ", fetchFilteredInvoices.status);
    const resultfetchFilteredInvoices = await fetchFilteredInvoices.json();

    return resultfetchFilteredInvoices;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch resultfetchFilteredInvoices data.");
  }
};

export const fetchInvoicesPages = async (query: string) => {
  const session = await auth();
  try {
    const getInvoicesPages = await fetch(`${process.env.BACKEND_URL}/invoices/page-count?q=${query}`, {
      headers: authHeaders(session?.user?.token)
    });
    const resultGetInvoicesPages = await getInvoicesPages.json();

    return resultGetInvoicesPages;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch resultGetInvoicesPages data.");
  }
};

export const fetchCustomers = async () => {
  const session = await auth();
  try {
    const getCustomers = await fetch(`${process.env.BACKEND_URL}/customer`, {
      headers: authHeaders(session?.user?.token)
    });
    const resultGetCustomers = await getCustomers.json();

    return resultGetCustomers;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch customers data.");
  }
};

export const fetchInvoiceById = async (id: string) => {
  const session = await auth();
  try {
    const getInvoiceById = await fetch(`${process.env.BACKEND_URL}/invoice/${id}`, {
      headers: authHeaders(session?.user?.token)
    });
    console.log("getInvoiceById :>> ", getInvoiceById.status);
    if (getInvoiceById.status === 404) return null;
    if (getInvoiceById.status !== 200) throw new Error("Error fetching invoice!!!");
    const resultInvoiceById = await getInvoiceById.json();

    return resultInvoiceById;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch resultInvoiceById data.");
  }
};
