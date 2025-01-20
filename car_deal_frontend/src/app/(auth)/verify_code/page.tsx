"use client";

import { resendVerificationCodeApi, verifyCodeApi } from "@/api/auth/authApis";
import { useAuth } from "@/context/userContext";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, Suspense, useState } from "react";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const router = useRouter();
  const {login} = useAuth()

  if (!email) {
    alert("No email provided");
    router.replace("/login");
  }

  const { mutate: verifyCodeMutateFn } = useMutation({
    mutationFn: async () => await verifyCodeApi(email, verificationCode),
    onSuccess: (data) => {
      alert(data.message);
      console.log('token after login ', data.token);
      console.log('entity after login ', data.entity);
      login(data.token, data.entity)
      setVerificationCode("");
      login
      const params = new URLSearchParams(searchParams.toString());
      params.delete("email");
      router.replace("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { mutate: resendVerifyCodeMutate } = useMutation({
    mutationFn: async () => await resendVerificationCodeApi(email),
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    verifyCodeMutateFn();
  };

  const resendEmailVerification = async () => {
    resendVerifyCodeMutate();
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="h-[70vh] border border-black flex flex-col items-center justify-center gap-4 "
    >
      <p className="font-bold text-[1.3em]">Check your inbox</p>
      <p className="text-black opacity-[.7]">
        Enter the verification code we just sent to{" "}
        <span className="font-semibold">{email}</span>{" "}
      </p>
      <input
        type="number"
        placeholder="Code"
        name="verificationCode"
        value={verificationCode}
        onChange={handleVerificationCodeChange}
        className="border-[1.5px] rounded-[5px] outline-none border-slate-500 p-1 w-[250px]"
      />
      <button className="bg-black text-white  w-[250px] py-1 rounded-[5px]">
        Continue
      </button>
      <button type="button" onClick={resendEmailVerification}>
        Resend email
      </button>
    </form>
  );
};

const VerifyCodePage = () => {
  return (
    <Suspense fallback>
      <VerifyCode />
    </Suspense>
  );
};

export default VerifyCodePage;
