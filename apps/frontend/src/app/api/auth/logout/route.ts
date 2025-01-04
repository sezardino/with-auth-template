import { ApplicationRoutes } from "@/const/routes";
import { deleteSession, getSession } from "@/server/session";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getSession();

  if (!session)
    return NextResponse.redirect(
      new URL(ApplicationRoutes.notFound, req.nextUrl)
    );

  await deleteSession();

  revalidatePath(ApplicationRoutes.landing.home);
  revalidatePath(ApplicationRoutes.landing.home, "layout");

  return NextResponse.redirect(
    new URL(ApplicationRoutes.landing.home, req.nextUrl)
  );
};
