package Cloud

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"google.golang.org/genai"
)

func CallLLM(prompt string) {
	doterr := godotenv.Load()

	if doterr != nil {
		log.Fatal("Error loading .env file")
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		log.Fatal(err)
	}

	// Change this line here and change the text to the one that the user wrote in the UI of switcher
	result, err := client.Models.GenerateContent(
		ctx, "gemini-3-flash-preview", genai.Text(prompt), nil,
	)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result.Text())
}
