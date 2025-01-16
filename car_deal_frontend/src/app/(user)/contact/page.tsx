"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import PhoneSvg from "../../../../public/contact/icons-phone.svg";
import { useMutation } from "@tanstack/react-query";
import { addContactApi } from "@/api/contact/contactApis";
import PhoneInput from "react-phone-input-2";
import { PhoneNumber } from "libphonenumber-js";
import "react-phone-input-2/lib/style.css";

const Contact = () => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handlePhoneNumChange = (value: string) => {
    setphoneNumber(`+${value}`);
  };

  const handleContactDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: contactMutate } = useMutation({
    mutationFn: async () =>
      await addContactApi({ ...contactData, phoneNumber }),
    onSuccess: (data) => {
      alert(data.message);
      console.log("contact data ", data);
      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    contactMutate();
  };
  return (
    <div className="w-[80%] mb-[10em] mx-auto">
      <div className="flex justify-between mt-[4em] text-[1.2em]">
        <p>
          <span className="text-black/60">Home</span> / About
        </p>
      </div>

      <div className="flex justify-between">
        {/* Left part */}
        <div className="shadow-[0px_1px_4px_rgba(21,36,64,0.5)] w-[30%] text-[1.1em] px-7 rounded-[6px]">
          <div className="p-[20px] border-b-2 flex flex-col gap-2 ">
            <div className="flex items-center mb-2  gap-[20px]">
              <PhoneSvg />
              <p>Call To Us</p>
            </div>

            <p>We are available 24/7, days a week.</p>
            <p>Phone: +880611112222</p>
          </div>
          <div className="p-[20px] flex flex-col gap-2 ">
            <div className="flex items-center mb-2 gap-[20px]">
              <PhoneSvg />
              <p>Call To Us</p>
            </div>

            <p>Fill out form and we will contact you within 24 hours</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* right part */}
        <div className="shadow-[0px_1px_4px_rgba(21,36,64,0.5)] w-[68%]  rounded-[5px]">
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col w-[96%] h-full mx-auto justify-evenly "
          >
            <div className="flex justify-between items-center">
              <input
                className="bg-searchFormBg p-2 rounded-[5px] outline-none w-[45%]"
                type="text"
                placeholder="Your first name"
                name="firstName"
                value={contactData.firstName}
                onChange={handleContactDataChange}
                required
              />

              <input
                className="bg-searchFormBg p-2 rounded-[5px] outline-none w-[45%]"
                type="text"
                placeholder="Your last name"
                name="lastName"
                value={contactData.lastName}
                onChange={handleContactDataChange}
                required
              />
            </div>

            <div className="flex justify-between items-center ">
              <input
                className="bg-searchFormBg p-2 rounded-[5px] outline-none w-[45%]"
                type="email"
                placeholder="Your Email"
                name="email"
                value={contactData.email}
                onChange={handleContactDataChange}
                required
              />

              <div className="w-45%">
                <PhoneInput country={"us"} onChange={handlePhoneNumChange}  />
                <input type="hidden" name="phoneNumber" value={phoneNumber} />
              </div>
              {/* <input
                className="bg-searchFormBg p-2 rounded-[5px] outline-none w-[45%]"
                type="number"
                placeholder="Your telephone"
                name="phoneNumber"
                value={contactData.phoneNumber}
                onChange={handleContactDataChange}
              /> */}
            </div>

            <textarea
              className=" p-2 resize-none outline-none border-none rounded-[5px] bg-searchFormBg h-[50%] "
              name="message"
              value={contactData.message}
              onChange={handleContactDataChange}
              id="message"
              placeholder="Your Message"
              required
            ></textarea>

            <div className="flex justify-end">
              <button className="bg-redColor text-white w-[20%] p-2 rounded-[5px]">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
