import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        title
      )}&maxResults=40&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );
    const booksData = await res.json();
    return NextResponse.json({ booksData });
  } catch (error) {
    return NextResponse.json({
      errorMessage: `An error occured: ${error.message}`,
    });
  }
}
