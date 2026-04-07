package Config

import (
	"backend/Agents/Cloud"
	"backend/core"
	"context"
	"log"
	"os"

	"google.golang.org/genai"
)

func InitProviders() map[string]core.Provider {
	ctx := context.Background()

	geminiClient, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})

	if err != nil {
		log.Fatal(err)
	}

	return map[string]core.Provider{
		"gemini": &Cloud.Gemini{
			Client: geminiClient,
		},
	}
}
