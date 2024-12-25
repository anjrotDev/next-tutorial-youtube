"use client";

import { createInvoice } from "@/app/helpers/actions";
import { CreateForm, CreateFormState, CustomerField } from "anjrot-components";
import Link from "next/link";
import { FC, useActionState } from "react";

const FormWrapper: FC<{ customers: CustomerField[] }> = ({ customers }) => {
  const initialState: CreateFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return <CreateForm customers={customers} action={formAction} state={state} AnchorElement={Link} />;
};

export default FormWrapper;
