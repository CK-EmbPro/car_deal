"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";
import SignUpBanner from "../../../../public/signup/signup_login_banner.svg";
import Google from "../../../../public/signup/Icon-Google.svg";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "@/api/auth/authApis";
import { useAuth } from "@/context/userContext";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {login} = useAuth()

  const { mutate } = useMutation({
    mutationFn: async (userData: FormData) => await registerUserApi(userData),
    onSuccess: (data) => {
      alert(data.message);
      login(data.token, data.entity)
      setRegisteringData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      });

      setPhoneNumber("");
      setProfilePhoto(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (error) => alert(error.message),
  });

  const [registeringData, setRegisteringData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handlePhoneNumChange = (value: string) => {
    setPhoneNumber(`${value}`);
  };

  const handleRegisterDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "file" && files && files.length > 0) {
      setProfilePhoto(files[0]);
    } else {
      setRegisteringData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!profilePhoto) {
      alert("Please upload a profile photo");
      return;
    }
    const registerUserFormData = new FormData();

    registerUserFormData.append("file", profilePhoto);
    registerUserFormData.append("firstName", registeringData.firstName);
    registerUserFormData.append("lastName", registeringData.lastName);
    registerUserFormData.append("email", registeringData.email);
    registerUserFormData.append("phoneNumber", phoneNumber);
    registerUserFormData.append("password", registeringData.password);

    // Execute registerUser query
    mutate(registerUserFormData);
  };

  return (
    <div className="flex py-[70px] pb-[90px] gap-[100px]">
      <div>
        <SignUpBanner />
      </div>
      <div className=" w-[25%] flex flex-col  pt-[70px] gap-4">
        <p className="text-[1.4em] font-semibold">Create an account</p>
        <p>Enter your details below</p>
        <form
          onSubmit={handleOnSubmit}
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            className="mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={registeringData.firstName}
            onChange={handleRegisterDataChange}
            required
          />
          <input
            className="mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300"
            type="text"
            placeholder="last Name"
            name="lastName"
            value={registeringData.lastName}
            onChange={handleRegisterDataChange}
            required
          />
          <input
            className="mb-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300"
            type="email"
            placeholder="Email"
            name="email"
            value={registeringData.email}
            onChange={handleRegisterDataChange}
            required
          />
          <div className="w-full ">
            <PhoneInput
              country={"us"}
              value={phoneNumber}
              onChange={handlePhoneNumChange}
            />

            <input type="hidden" name="phoneNumber" value={phoneNumber} />
          </div>
          <input
            className="my-4 outline-none indent-1 rounded-[5px] border p-1 w-[79%] border-slate-300"
            type="password"
            placeholder="Password"
            name="password"
            value={registeringData.password}
            onChange={handleRegisterDataChange}
            required
          />

          {/* Profile photo */}
          <div className=" flex flex-col gap-2">
            <label htmlFor="profile_photo">Profile photo</label>
            <input
              ref={fileInputRef}
              onChange={(e) => handleRegisterDataChange(e)}
              id="profile_photo"
              type="file"
              name="file"
              accept="image/*"
            />
          </div>

          <button className="bg-red-500 text-white py-2 w-[79%] rounded-[5px]">
            Create Account
          </button>
          <button
            type="button"
            className="border-2 border-[searchFormBg] w-[79%] rounded-[5px] flex justify-center items-center py-2 gap-3"
          >
            <Google />
            Sign up with Google
          </button>
        </form>

        <p>
          Already have account?{" "}
          <Link href={"login"} className="underline-offset-[6px]   underline">
            Log in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
