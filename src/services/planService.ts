export async function getPlans() {
  const response = await fetch("/api/plans")
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
