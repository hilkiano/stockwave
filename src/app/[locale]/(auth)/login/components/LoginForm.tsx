"use client";

import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, PasswordInput, TextInput, Divider } from "@mantine/core";
import { GoogleIcon } from "@/components/SvgIcons";

function LoginForm() {
  const t = useTranslations("Page.Login");

  const schema = z.object({
    username: z.string().min(1, { message: t("val_min_username") }),
    password: z.string().min(1, { message: t("val_min_password") }),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex flex-col gap-2">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t("username")}
                description={t("desc_username")}
                error={errors.username?.message}
                autoComplete="off"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                label={t("password")}
                error={errors.password?.message}
                autoComplete="off"
                value={value}
                onChange={onChange}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? (
                    <i className="ti ti-eye text-lg"></i>
                  ) : (
                    <i className="ti ti-eye-closed text-lg"></i>
                  )
                }
              />
            )}
          />
        </div>
        <Button
          variant="filled"
          className="mt-4 w-full md:w-auto"
          type="submit"
        >
          {t("btn_login")}
        </Button>
      </form>
      <Divider className="my-4 md:my-6" label={t("or")} />
      <Button
        variant="default"
        leftSection={<GoogleIcon width={14} height={14} />}
        fullWidth
      >
        {t("btn_google")}
      </Button>
    </div>
  );
}

export default LoginForm;
