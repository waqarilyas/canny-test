// Run this with: node get-board-id.js
// This will fetch your Board ID from Canny

const apiKey = "7bcd3423-7cc3-2e9b-cdce-4de6cab32652";

fetch("https://canny.io/api/v1/boards/list", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    apiKey: apiKey,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Your Canny Boards:");
    console.log(JSON.stringify(data, null, 2));

    if (data.boards && data.boards.length > 0) {
      console.log("\n=== Board IDs ===");
      data.boards.forEach((board) => {
        console.log(`\nBoard: ${board.name}`);
        console.log(`Board ID: ${board.id}`);
        console.log(`URL: ${board.url}`);
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
