import { type NextRequest, NextResponse } from "next/server";

import {
  emptyReceiveReview,
  receiveReview
} from "../../../../_data/review/index";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  if (page === "0") return NextResponse.json(receiveReview, { status: 200 });
  else return NextResponse.json(emptyReceiveReview, { status: 200 });
}