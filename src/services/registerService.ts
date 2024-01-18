type RegDataType = {
  form_data: {
    business_name: string;
    business_email: string;
    business_phone: string;
    business_address: string;
    personal_name: string;
    personal_email: string;
    personal_phone: string;
    personal_address: string;
  };
  choosed_plan: PlansModelType;
};

export async function registerUser(payload: RegDataType) {
  const response = await fetch("/api/auth/register", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error(res.message, { cause: res });
      }
      return res;
    })
    .catch((err) => {
      throw new Error(err.message, err);
    });

  return response;
}
