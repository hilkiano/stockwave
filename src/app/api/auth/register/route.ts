import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/registration/owner`, res, {
      headers: {
        "x-app-locale": lang ? lang.value : "id",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((res) => res.response);

  return Response.json(response.data, { headers: response.headers });
}
