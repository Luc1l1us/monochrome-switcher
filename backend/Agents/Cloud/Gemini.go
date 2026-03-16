package Cloud

import (
	"context"
	"fmt"
	"log"

	"google.golang.org/genai"
)

func CallLLM(prompt string, apikey string, err error) {

	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  apikey,
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
