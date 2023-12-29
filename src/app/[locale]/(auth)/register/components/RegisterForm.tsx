"use client";

import { Button, Card, Divider, TextInput, Textarea } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import React, { useEffect } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { useLocalStorage } from "@mantine/hooks";
import { useRegisterStore } from "../stores/RegisterStore";

function RegisterForm() {
  const t = useTranslations("Page.Register.Step_1");
  const step = useRegisterStore((state) => state.step);

  const schema = z.object({
    business_name: z.string().min(1, { message: t("val_min_business_name") }),
    business_email: z
      .string()
      .email(t("val_format_email"))
      .min(1, { message: t("val_min_business_email") }),
    business_phone: z
      .string()
      .min(1, { message: t("val_min_business_phone") })
      .refine(isMobilePhone, t("val_format_phone")),
    business_address: z.string(),
    personal_name: z.string().min(1, { message: t("val_min_personal_name") }),
    personal_email: z
      .string()
      .email(t("val_format_email"))
      .min(1, { message: t("val_min_personal_email") }),
    personal_phone: z
      .string()
      .min(1, { message: t("val_min_personal_phone") })
      .refine(isMobilePhone, t("val_format_phone")),
    personal_address: z.string(),
  });

  type RegDataType = {
    form_data?: z.infer<typeof schema>;
    choosed_plan?: number;
  };

  const [regData, setRegData] = useLocalStorage<RegDataType | null>({
    key: "registration-data",
    defaultValue: null,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      business_name: "",
      business_email: "",
      business_phone: "",
      business_address: "",
      personal_name: "",
      personal_email: "",
      personal_phone: "",
      personal_address: "",
    },
  });

  const goToNextStep = (data: z.infer<typeof schema>) => {
    setRegData({
      form_data: data,
    });
    useRegisterStore.setState({ step: step + 1 });
  };

  useEffect(() => {
    if (regData) {
      setValue("business_name", regData.form_data!.business_name);
      setValue("business_email", regData.form_data!.business_email);
      setValue("business_phone", regData.form_data!.business_phone);
      setValue("business_address", regData.form_data!.business_address);
      setValue("personal_name", regData.form_data!.personal_name);
      setValue("personal_email", regData.form_data!.personal_email);
      setValue("personal_phone", regData.form_data!.personal_phone);
      setValue("personal_address", regData.form_data!.personal_address);
    }
  }, [regData, setValue]);

  return (
    <div className="flex justify-center mt-4 mb-12">
      <Card withBorder radius="lg" className="w-full max-w-[650px]">
        <div className="flex flex-col md:flex-row gap-5 md:gap-2 p-0 md:p-3 ">
          <div className="flex gap-2 flex-col px-0 w-full">
            <h1 className="m-0 font-normal text-3xl md:text-4xl">
              {t("title")}
            </h1>
            <p className="m-0 opacity-75">{t("body_1")}</p>
            <form
              name="registration-form"
              onSubmit={handleSubmit((data) => goToNextStep(data))}
            >
              <div className="flex flex-col gap-2">
                <Divider label={t("b_subtitle")} labelPosition="center" />
                <Controller
                  control={control}
                  name="business_name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      withAsterisk
                      className="w-full"
                      label={t("business_name")}
                      error={errors.business_name?.message}
                      autoComplete="off"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <div className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Controller
                    control={control}
                    name="business_email"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        leftSection={<i className="ti ti-mail"></i>}
                        withAsterisk
                        label={t("business_email")}
                        error={errors.business_email?.message}
                        autoComplete="off"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="business_phone"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        leftSection={<i className="ti ti-phone"></i>}
                        withAsterisk
                        label={t("business_phone")}
                        error={errors.business_phone?.message}
                        autoComplete="off"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <Controller
                  control={control}
                  name="business_address"
                  render={({ field: { onChange, value } }) => (
                    <Textarea
                      className="w-full"
                      label={t("business_address")}
                      error={errors.business_address?.message}
                      autoComplete="off"
                      value={value}
                      onChange={onChange}
                      autosize
                      minRows={2}
                      maxRows={4}
                    />
                  )}
                />
                <Divider label={t("p_subtitle")} labelPosition="center" />
                <Controller
                  control={control}
                  name="personal_name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      withAsterisk
                      className="w-full"
                      label={t("personal_name")}
                      error={errors.personal_name?.message}
                      autoComplete="off"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <div className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Controller
                    control={control}
                    name="personal_email"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        leftSection={<i className="ti ti-mail"></i>}
                        withAsterisk
                        label={t("personal_email")}
                        error={errors.personal_email?.message}
                        autoComplete="off"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="personal_phone"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        leftSection={<i className="ti ti-phone"></i>}
                        withAsterisk
                        label={t("personal_phone")}
                        error={errors.personal_phone?.message}
                        autoComplete="off"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <Controller
                  control={control}
                  name="personal_address"
                  render={({ field: { onChange, value } }) => (
                    <Textarea
                      className="w-full"
                      label={t("personal_address")}
                      error={errors.personal_address?.message}
                      autoComplete="off"
                      value={value}
                      onChange={onChange}
                      autosize
                      minRows={2}
                      maxRows={4}
                    />
                  )}
                />
                <div className="flex mt-4 justify-between">
                  <Button
                    component={Link}
                    href="/login"
                    size="xs"
                    leftSection={<i className="ti ti-arrow-big-left"></i>}
                    variant="subtle"
                  >
                    {t("btn_back")}
                  </Button>
                  <Button
                    type="submit"
                    size="xs"
                    rightSection={<i className="ti ti-arrow-big-right"></i>}
                    variant="filled"
                  >
                    {t("btn_next")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RegisterForm;
