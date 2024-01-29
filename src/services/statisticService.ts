export async function getProductStats() {
  const response = await fetch("/api/stats/product")
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
