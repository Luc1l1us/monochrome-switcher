package config

import (
	"backend/Agents/Cloud"
	"backend/core"
	"context"
	"log"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
	"google.golang.org/genai"
)

func InitProviders() map[string]core.Provider {
	ctx := context.Background()

	//Gemini Client Initialization
	geminiClient, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})

	if err != nil {
		log.Fatal(err)
	}

	//ChatGPT Client Initialization
	chatgptClient := openai.NewClient(
		option.WithAPIKey(os.Getenv("OPENAI_API_KEY")),
	)

	return map[string]core.Provider{
		"chatgpt": &Cloud.ChatGPT{
			Client: &chatgptClient,
		},
		"gemini": &Cloud.Gemini{
			Client: geminiClient,
		},
	}
}
