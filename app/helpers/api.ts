const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGVmNzAwMmYzNGFjMWVlY2UxNzc2ZCIsImVtYWlsIjoibmV4dFR1dG9yaWFsQHRlc3QuY29tIiwibmFtZSI6Im5leHRUdXRvcmlhbCIsImlhdCI6MTczMzIyODM3M30.tlMGUN7S06L2fT1-We-IacbNnux5c0jK5MFCmyhYkBo"
};

export const fetchCardData = async () => {
  try {
    const [getCustomerCount, getInvoicesCount, getInvoicesStatusCount] = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/customer/count`, { headers }),
      fetch(`${process.env.BACKEND_URL}/invoices/count`, { headers }),
      fetch(`${process.env.BACKEND_URL}/invoices/status-count`, { headers })
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
  try {
    const fetchRevenue = await fetch(`${process.env.BACKEND_URL}/revenues`, { headers });
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
  try {
    const fetchInvoices = await fetch(`${process.env.BACKEND_URL}/invoices`, { headers });
    const resultFetchInvoices = await fetchInvoices.json();

    return resultFetchInvoices;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch fetchLatestInvoices data.");
  }
};

export const fetchFilteredInvoices = async (query?: string, currentPage?: number) => {
  console.log("currentPage :>> ", currentPage);
  try {
    const fetchFilteredInvoices = await fetch(`${process.env.BACKEND_URL}/invoices/paginate?q=${query}&page=${currentPage}`, { headers });
    console.log("fetchFilteredInvoices :>> ", fetchFilteredInvoices.status);
    const resultfetchFilteredInvoices = await fetchFilteredInvoices.json();

    return resultfetchFilteredInvoices;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch resultfetchFilteredInvoices data.");
  }
};

export const fetchInvoicesPages = async (query: string) => {
  try {
    const getInvoicesPages = await fetch(`${process.env.BACKEND_URL}/invoices/page-count?q=${query}`, { headers });
    const resultGetInvoicesPages = await getInvoicesPages.json();

    return resultGetInvoicesPages;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch resultGetInvoicesPages data.");
  }
};

export const fetchCustomers = async () => {
  try {
    const getCustomers = await fetch(`${process.env.BACKEND_URL}/customer`, { headers });
    const resultGetCustomers = await getCustomers.json();

    return resultGetCustomers;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch customers data.");
  }
};

export const fetchInvoiceById = async (id: string) => {
  try {
    const getInvoiceById = await fetch(`${process.env.BACKEND_URL}/invoice/${id}`, { headers });
    const resultInvoiceById = await getInvoiceById.json();

    return resultInvoiceById;
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch resultInvoiceById data.");
  }
};
