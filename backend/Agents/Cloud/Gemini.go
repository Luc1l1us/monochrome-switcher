package Cloud

import (
	"context"
	"fmt"
	"monochrome-switcher/backend/core"

	"google.golang.org/genai"
)

type Gemini struct {
	Client *genai.Client
}

// func (g *Gemini) Generate(prompt string) (string, error) {
func (g *Gemini) Generate(messages []core.Message) (string, error) {
	ctx := context.Background()

	prompt := core.BuildPrompt(messages)

	// checking history
	fmt.Println("===== Gemini Prompt =====")
	fmt.Println(prompt)
	fmt.Println("=========================")
	// end of history

	result, err := g.Client.Models.GenerateContent(
		ctx,
		"gemini-3-flash-preview",
		genai.Text(prompt),
		nil,
	)

	if err != nil {
		return "", err
	}

	if result == nil {
		return "", fmt.Errorf("Empty Response")
	}

	return result.Text(), err
}

/* func CallGemini(prompt string, apikey string, err error) {

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
} */
