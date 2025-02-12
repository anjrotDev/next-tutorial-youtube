"use server";

import { authHeaders } from "@/app/helpers/utils";
import { auth, signIn } from "@/auth";
import { CreateFormState } from "anjrot-components";
import { AuthError } from "next-auth";
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
  const session = await auth();
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
      headers: authHeaders(session?.user?.token),
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
  const session = await auth();
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
      headers: authHeaders(session?.user?.token),
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
  const session = await auth();
  const id = formData.get("invoiceId");

  try {
    await fetch(`${process.env.BACKEND_URL}/invoices/${id}`, {
      headers: authHeaders(session?.user?.token),
      method: "DELETE"
    });
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice."
    };
  }
};

export const authenticate = async (state: string | undefined, formData: FormData) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};
