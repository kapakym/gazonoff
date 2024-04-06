"use client";
import { Field } from "@/components/ui/Field/Field";
import { ADMIN_PAGES } from "@/config/pages-url.config";
import { authService } from "@/services/auth.service";
import { IAuthForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Auth() {
  const { push } = useRouter();

  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: "onChange",
  });

  const [isLoginForm, setIsLoginForm] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: IAuthForm) => authService.login(data),
    onSuccess: () => {
      toast.success("Succsefully login!");
      reset();
      push(ADMIN_PAGES.CATEGORY);
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      <form
        className="w-1/4 m-auto  bg-gray-800 rounded-xl p-2 flex flex-col space-y-2 shadow-sm shadow-slate-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          label="Email"
          placeholder={"Enter email"}
          {...register("email")}
        />
        <Field
          label="Password"
          placeholder={"Enter password"}
          {...register("password")}
        />
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}
