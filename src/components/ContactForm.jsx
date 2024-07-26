import contactSuccessImage from "../assets/Images/ContactSuccess.svg";
import Button from "./ui/button";
import Icons from "./ui/icons";
import Image from "./ui/image";
import Input from "./ui/input";
import Label from "./ui/label";
import Textarea from "./ui/textarea";
import { Caption, Heading } from "../components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { contactSubmissionSchema } from "../lib/validations/contact-submission";
import { useState } from "react";
import { usePortfolio } from "../context/protfolioContext";
import axios from "axios";
import { PhoneInput } from "react-international-phone";
import * as countriesAndTimezones from "countries-and-timezones";
import "./ContactForm.css";
import { isPhoneValid } from "../lib/utils";
import { appEnvs } from "../lib/env";

function ContactForm() {
  const { portfolioData } = usePortfolio();
  const data =
    portfolioData && portfolioData.website ? portfolioData.website : "";
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(contactSubmissionSchema),
    mode: "onChange",
  });

  const phone = watch("phone");
  const isValidPhoneNumber = isPhoneValid(phone);
  console.log(isValidPhoneNumber, "isValidPhoneNumber");

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneInfo = countriesAndTimezones.getTimezone(timezone);
  const defalutCountryCode = timezoneInfo?.countries?.[0]?.toLocaleLowerCase();

  // const sendEmail = async () => {
  //   try {
  //     const payload = {
  //       "email": "himanshukumar077@gmail.com",
  //       "subject": "hello mail",
  //       "body": "test mail body"
  //     };

  //     const response = await fetch("https://my9h84b2f9.execute-api.ap-south-1.amazonaws.com/default/sendMail", {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(payload)
  //     });
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log(responseData);
  //     } else {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to send email');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleSubmitEmail = async (data) => {
    const payload = {
      email: appEnvs.REACT_APP_CONTACT_US_RECEIVER_EMAIL,
      subject: data.message,
      body: `Hi Himanshu, I visited your website and I would like to connect with you. My name is ${
        data.name
      } and My email is <a href="mailto://${data.email}">${data.email}</a> ${
        isValidPhoneNumber && data.phone
          ? `, My phone number is <a href="tel:${data.phone}">${data.phone}</a>`
          : ""
      }. <br /> <h3>Message:</h3><p>${data.message || ""}</p>`,
      phone: data.phone,
    };

    try {
      const response = await axios.post(
        "https://p65drtxuxja4jbiupmsjzjugja0ylitp.lambda-url.ap-south-1.on.aws",
        payload
      );
      if (response.data.statusCode === 200) {
        setIsSubmitSuccessful(true);
        reset();
      } else {
        setIsSubmitSuccessful(false);
      }
    } catch (error) {
      setIsSubmitSuccessful(false);
    }
  };

  return isSubmitSuccessful ? (
    <div>
      <Caption>Successful</Caption>
      <Heading>I will be in touch with you</Heading>
      <Image
        metadata={contactSuccessImage}
        alt="A flying paper plane"
        src={contactSuccessImage}
      />
    </div>
  ) : (
    <form onSubmit={handleSubmit(handleSubmitEmail)}>
      <fieldset disabled={isSubmitting} className="group flex flex-col gap-y-6">
        <div>
          <Label htmlFor="contact-form-name">Name</Label>
          <Input id="contact-form-name" type="text" {...register("name")} />
        </div>
        <div>
          <Label htmlFor="contact-form-email">Email</Label>
          <Input
            id="contact-form-email"
            type="email"
            className={errors.email ? "border-error" : ""}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 flex items-center text-sm text-error">
              <Icons.Warning aria-hidden className="me-2 inline size-5" />
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="!w-full">
          <label className="!text-[--white-text] Spartan-Thin !gap-1 !text-sm mb-2">
            Phone (Optional)
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                forceDialCode={false}
                className="phone-input"
                style={{
                  "--react-international-phone-border-radius": "2px",
                  "--react-international-phone-background-color":
                    "rgb(22 26 44 / var(--tw-bg-opacity))",
                  "--react-international-phone-text-color": "#fff",
                  "--react-international-phone-selected-dropdown-item-background-color":
                    "rgb(22 26 44 / var(--tw-bg-opacity))",
                  "--react-international-phone-country-selector-background-color-hover":
                    "rgb(22 26 44 / var(--tw-bg-opacity))",
                }}
                inputClassName="flex-1 !border-0 h-[40px]"
                defaultCountry={defalutCountryCode}
              />
            )}
          />
          {errors.phone && (
            <p className="mt-2 flex items-center text-sm text-error">
              <Icons.Warning aria-hidden className="me-2 inline size-5" />
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact-form-message">Message</Label>
          <Textarea id="contact-form-message" {...register("message")} />
        </div>
        <div className="flex max-sm:flex-col-reverse max-sm:gap-y-6 sm:items-center sm:justify-between">
          <a
            className="inline-flex items-center text-neutrals-300 transition-colors hover:text-neutrals-50 focus-visible:text-neutrals-50"
            href={`mailto:${data.email}`}
            title="Hit me up"
          >
            <Icons.Envelope aria-hidden="true" className="me-2 inline size-5" />
            {data.email}
          </a>
          <Button
            type="submit"
            className="disabled:cursor-progress max-sm:w-full"
            disabled={!isValid}
          >
            Hit me up
            <div
              aria-hidden
              className="ms-2 inline opacity-70 group-enabled:hidden"
            ></div>
            <Icons.Rocket
              aria-hidden
              className="ms-2 inline size-5 group-disabled:hidden"
            />
          </Button>
        </div>
        {errors.root && (
          <p className="mt-2 flex items-center text-sm text-error">
            <Icons.Warning aria-hidden className="me-2 inline size-5" />
            {errors.root.message}
          </p>
        )}
      </fieldset>
    </form>
  );
}

export default ContactForm;
