"use client";

import { authenticate } from "@/app/helpers/actions";
import { LoginForm } from "anjrot-components";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const LoginWrapper = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  return <LoginForm action={formAction} error={errorMessage} callbackurl={callbackUrl} />;
};

export default LoginWrapper;
