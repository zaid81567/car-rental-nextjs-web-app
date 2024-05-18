import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
const access_token = process.env.MAPBOX_ACCESS_TOKEN;
const session_token = "08bcec61-643c-4761-88f8-7cbcae70bc85";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");
  console.log(access_token);

  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      `&language=en&limit=8&session_token=${session_token}&country=IN&access_token=${access_token}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchResult = await res.json();

  return NextResponse.json(searchResult);
}
