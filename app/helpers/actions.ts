"use server";

import { CreateFormState } from "anjrot-components";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer."
  }),
  amount: z.coerce.number().gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status."
  }),
  date: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true });

export const createInvoice = async (prevState: CreateFormState, formData: FormData) => {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status")
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice."
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  const body = {
    status,
    date,
    amount: amountInCents,
    customer: customerId
  };

  try {
    await fetch(`${process.env.BACKEND_URL}/invoices`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGVmNzAwMmYzNGFjMWVlY2UxNzc2ZCIsImVtYWlsIjoibmV4dFR1dG9yaWFsQHRlc3QuY29tIiwibmFtZSI6Im5leHRUdXRvcmlhbCIsImlhdCI6MTczMzIyODM3M30.tlMGUN7S06L2fT1-We-IacbNnux5c0jK5MFCmyhYkBo"
      },
      method: "POST",
      body: JSON.stringify(body)
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice."
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

export const updateInvoice = async (prevState: CreateFormState, formData: FormData) => {
  console.log("formData :>> ", formData);
  const validatedFields = UpdateInvoice.safeParse({
    id: formData.get("invoiceId"),
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status")
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice."
    };
  }

  const { customerId, amount, status, id } = validatedFields.data;
  const amountInCents = amount * 100;

  const body = {
    status,
    amount: amountInCents,
    customer: customerId
  };

  try {
    await fetch(`${process.env.BACKEND_URL}/invoices/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGVmNzAwMmYzNGFjMWVlY2UxNzc2ZCIsImVtYWlsIjoibmV4dFR1dG9yaWFsQHRlc3QuY29tIiwibmFtZSI6Im5leHRUdXRvcmlhbCIsImlhdCI6MTczMzIyODM3M30.tlMGUN7S06L2fT1-We-IacbNnux5c0jK5MFCmyhYkBo"
      },
      method: "PUT",
      body: JSON.stringify(body)
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice."
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

export const deleteInvoice = async (formData: FormData) => {
  const id = formData.get("invoiceId");

  try {
    await fetch(`${process.env.BACKEND_URL}/invoices/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGVmNzAwMmYzNGFjMWVlY2UxNzc2ZCIsImVtYWlsIjoibmV4dFR1dG9yaWFsQHRlc3QuY29tIiwibmFtZSI6Im5leHRUdXRvcmlhbCIsImlhdCI6MTczMzIyODM3M30.tlMGUN7S06L2fT1-We-IacbNnux5c0jK5MFCmyhYkBo"
      },
      method: "DELETE"
    });
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice."
    };
  }
};
