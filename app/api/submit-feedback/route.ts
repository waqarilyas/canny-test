import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, details, email, name } = body;

    // Create or retrieve user
    const userResponse = await fetch(
      "https://canny.io/api/v1/users/find_or_create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: process.env.CANNY_API_KEY,
          email: email,
          name: name,
        }),
      }
    );

    const userData = await userResponse.json();

    if (!userData.id) {
      throw new Error("Failed to create user");
    }

    // Create the post
    const postResponse = await fetch("https://canny.io/api/v1/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.CANNY_API_KEY,
        boardID: process.env.CANNY_BOARD_ID,
        authorID: userData.id,
        title: title,
        details: details,
      }),
    });

    const postData = await postResponse.json();

    if (postResponse.ok) {
      return NextResponse.json({ success: true, data: postData });
    } else {
      return NextResponse.json(
        { success: false, error: postData },
        { status: postResponse.status }
      );
    }
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit feedback",
      },
      { status: 500 }
    );
  }
}
