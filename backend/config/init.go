package config

import (
	"context"
	"os"

	"backend/provider.go/Agents/Cloud"

	"google.golang.org/genai"
)

func InitProviders() map[string]Provider {
	ctx := context.Background()

	geminiClient, _ := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})

	return map[string]Provider{
		"gemini": &Cloud.Gemini{
			Client: geminiClient,
		},
	}
}
