export type UpdateUserType = {
  id: string;
} & Partial<Omit<UserModelType, "id">>;

export async function updateUser(payload: UpdateUserType) {
  const response = await fetch("/api/user/update", {
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
