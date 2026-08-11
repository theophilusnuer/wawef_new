import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
};

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, route: "revalidate-tag" });
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return new NextResponse(
      "Missing environment variable SANITY_REVALIDATE_SECRET",
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // Always flush the global live tag used by sanityFetch.
    revalidateTag("sanity", "max");

    if (body?._type) {
      revalidateTag(body._type, "max");
    }

    const tags = ["sanity", body?._type].filter(
      (tag): tag is string => Boolean(tag),
    );

    return NextResponse.json({ revalidated: true, tags });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Revalidation request failed";

    return NextResponse.json({ message }, { status: 500 });
  }
}
