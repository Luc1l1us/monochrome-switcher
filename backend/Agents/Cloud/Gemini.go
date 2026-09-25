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
	fmt.Println("\n===== Gemini Prompt =====")
	fmt.Println(prompt)
	fmt.Println("=========================")
	// end of history

	result, err := g.Client.Models.GenerateContent(
		ctx,
		"gemini-3-flash-preview",
		genai.Text(prompt),
		nil,
	)

	// uncomment this if problem is solved
	//fmt.Println("Gemini received the msg successfully!")
	//fmt.Println(`The result is:`, result.Text())

	if err != nil {
		return "", fmt.Errorf("Gemini GenerateContent: %w", err)
	}

	if result == nil {
		return "", fmt.Errorf("Gemini returned a nil response")
	}

	//debugging purposes
	if len(result.Candidates) == 0 {
		return "", fmt.Errorf("Gemini returned no candidates")
	}

	candidate := result.Candidates[0]

	if candidate == nil {
		return "", fmt.Errorf("Gemini candidate has no content")
	}

	if len(candidate.Content.Parts) == 0 {
		return "", fmt.Errorf("Gemini candidate has no parts")
	}

	for _, part := range candidate.Content.Parts {
		if part == nil {
			continue
		}

		if part.Text != "" {
			return part.Text, nil
		}
	}

	return "", fmt.Errorf("Gemini response contained no text")

	//return result.Text(), err
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
