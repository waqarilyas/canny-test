import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, details, email, name } = body;

    console.log("Creating post with:", { title, details, email, name });
    console.log("Using API Key:", process.env.CANNY_API_KEY?.substring(0, 10) + "...");
    console.log("Using Board ID:", process.env.CANNY_BOARD_ID);

    // Create or retrieve user first
    const createUserResponse = await fetch(
      "https://canny.io/api/v1/users/find_or_create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: process.env.CANNY_API_KEY,
          email: email,
          name: name || email.split("@")[0],
        }),
      }
    );

    const createUserText = await createUserResponse.text();
    console.log("User creation response:", createUserText);

    let userData;
    try {
      userData = JSON.parse(createUserText);
    } catch (e) {
      console.error("Failed to parse user response:", createUserText);
      throw new Error("Invalid API Key or Canny API error");
    }

    if (!userData.id) {
      throw new Error(`User creation failed: ${JSON.stringify(userData)}`);
    }

    const authorID = userData.id;
    console.log("Author ID:", authorID);

    // Now create the post with the author ID
    const response = await fetch("https://canny.io/api/v1/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.CANNY_API_KEY,
        boardID: process.env.CANNY_BOARD_ID,
        authorID: authorID,
        title: title,
        details: details,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json(
        { success: false, error: data },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit feedback",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
