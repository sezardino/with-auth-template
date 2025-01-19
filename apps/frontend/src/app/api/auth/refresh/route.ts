import { updateTokens } from "@/server/session/tttt";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  accessToken: z.string().jwt(),
  refreshToken: z.string().jwt(),
});

export async function POST(req: NextRequest) {
  // const body = await req.json();
  // const { accessToken, refreshToken } = body;

  // if (!accessToken || !refreshToken)
  //   return new Response("Provide Tokens", { status: 401 });

  await updateTokens({ accessToken: "1", refreshToken: "2" });
  // console.log(1);
  return Response.json(
    { success: true },
    {
      headers: {
        "Set-Cookie": "test=true",
      },
    }
  );
}

// export const POST = async (req: NextRequest) => {
//   const body = await req.json();
//   const validationResponse = schema.safeParse(body);

//   if (!validationResponse.success) {
//     await deleteSession();

//     revalidatePath(ApplicationRoutes.landing.home);
//     revalidatePath(ApplicationRoutes.landing.home, "layout");
//     return NextResponse.redirect(
//       new URL(ApplicationRoutes.auth.login, req.nextUrl)
//     );
//   }

//   // await updateSession(
//   //   validationResponse.data.accessToken,
//   //   validationResponse.data.refreshToken
//   // );

//   const res = NextResponse.json({ success: true }, { status: 200 });

//   const session = await getSession();

//   const sessionToken = await createSessionToken({
//     user: session?.user!,
//     accessToken: validationResponse.data.accessToken,
//     refreshToken: validationResponse.data.refreshToken,
//   });

//   const expiredAt = dayjs().add(7, "days").toDate();

//   console.log(await getSession());

//   // res.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
//   //   httpOnly: true,
//   //   secure: true,
//   //   expires: expiredAt,
//   //   path: "/",
//   //   sameSite: "lax",
//   // });
//   res.cookies.set("SESSION_COOKIE_NAME", "123", {});

//   console.log(await getSession());
//   return res;
// };
