export async function getPlans() {
  const response = await fetch("/api/plans");
  if (!response.ok) {
    throw new Error("Error", response as ErrorOptions);
  }
  return response.json();
}
