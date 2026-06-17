import { NextResponse } from "next/server";
import { searchCatalog } from "@/data/catalog";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";

  return NextResponse.json(searchCatalog(query));
}
