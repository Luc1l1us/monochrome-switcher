package Config

import (
	"backend/Agents/Cloud"
	"backend/core"
	"context"
	"os"

	"google.golang.org/genai"
)

func InitProviders() map[string]core.Provider {
	ctx := context.Background()

	geminiClient, _ := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})

	return map[string]core.Provider{
		"gemini": &Cloud.Gemini{
			Client: geminiClient,
		},
	}
}
