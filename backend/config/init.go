package config

import (
	"context"
	"log"
	"monochrome-switcher/backend/Agents/Cloud"
	"monochrome-switcher/backend/core"
	"os"

	"github.com/anthropics/anthropic-sdk-go"
	anthropicOption "github.com/anthropics/anthropic-sdk-go/option"
	"github.com/joho/godotenv"

	"github.com/openai/openai-go/v3"
	openaiOption "github.com/openai/openai-go/v3/option"

	"google.golang.org/genai"
)

func InitProviders() map[string]core.Provider {

	dotenv := godotenv.Load("../backend/.env")

	if dotenv != nil {
		log.Println("Warning: .env not loaded")
	}

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
		openaiOption.WithAPIKey(os.Getenv("OPENAI_API_KEY")),
	)

	//Claude Client Initialization
	claudeClient := anthropic.NewClient(
		anthropicOption.WithAPIKey(os.Getenv("ANTHROPIC_API_KEY")),
	)

	return map[string]core.Provider{
		"claude": &Cloud.Claude{
			Client: &claudeClient,
		},
		"chatgpt": &Cloud.ChatGPT{
			Client: &chatgptClient,
		},
		"gemini": &Cloud.Gemini{
			Client: geminiClient,
		},
	}
}
