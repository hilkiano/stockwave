import axios from "axios";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  const jwt = cookieStore.get("jwt");
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, null, {
      headers: {
        "x-app-locale": lang ? lang.value : "id",
        "x-token": jwt ? jwt.value : null,
      },
      withCredentials: true,
    })
    .then((res) => res)
    .catch((res) => res.response);

  return Response.json(response.data, { headers: response.headers });
}
