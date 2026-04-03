package Cloud

import (
	"context"
	"fmt"

	"google.golang.org/genai"
)

type Gemini struct {
	APIKey string
}

func (g *Gemini) Generate(prompt string) (string, error) {
	ctx := context.Background()

	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  g.APIKey,
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		return "", err
	}

	result, err := client.Models.GenerateContent(
		ctx, "gemini-3-flash-preview", genai.Text(prompt), nil,
	)

	if err != nil {
		return "", err
	}

	if result == nil {
		return "", fmt.Errorf("Empty response from Gemini")
	}

	//fmt.Println(result.Text())
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
