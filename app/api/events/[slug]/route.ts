import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

type EventRouteContext = {
  params: Promise<{
    slug?: string;
  }>;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(
  _request: Request,
  context: EventRouteContext,
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { message: "Missing event slug." },
        { status: 400 },
      );
    }

    const normalizedSlug = slug.trim().toLowerCase();

    // Keep lookups predictable and reject malformed dynamic params early.
    if (!SLUG_PATTERN.test(normalizedSlug)) {
      return NextResponse.json(
        { message: "Invalid event slug." },
        { status: 400 },
      );
    }

    await connectDB();

    const event = await Event.findOne({ slug: normalizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully.",
        event,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return NextResponse.json(
      {
        message: "Failed to fetch event.",
        error: message,
      },
      { status: 500 },
    );
  }
}
