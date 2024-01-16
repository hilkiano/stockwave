import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/plans`, {
      headers: {
        "x-app-locale": lang ? lang.value : "id",
      },
    })
    .then((res) => res)
    .catch((res) => res.response);

  return Response.json(response.data);
}
