package Cloud

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"monochrome-switcher/backend/core"
	"monochrome-switcher/backend/services"
	"os"
	"time"

	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/components"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"github.com/OpenRouterTeam/go-sdk/optionalnullable"
)

type OpenRouterAI struct {
	Client *openrouter.OpenRouter
}

type ModelInfo struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (g *OpenRouterAI) Generate(messages []core.Message) (string, error) {
	ctx, cancel := context.WithTimeout(
		context.Background(),
		30*time.Second,
	)
	defer cancel()

	prompt := core.BuildPrompt(messages)

	fmt.Println("About to call OpenRouter Chat.Send")
	result, err := g.Client.Chat.Send(
		ctx,
		components.ChatRequest{
			Model: openrouter.Pointer("google/gemini-2.5-flash"),
			MaxCompletionTokens: optionalnullable.From(
				openrouter.Pointer(int64(4096)),
			),
			Messages: []components.ChatMessages{
				components.CreateChatMessagesUser(
					components.ChatUserMessage{
						Content: components.CreateChatUserMessageContentStr(prompt),
						Role:    components.ChatUserMessageRoleUser,
					},
				),
			},
		},
		nil,
	)

	// Uncomment these if errors pop up
	//fmt.Println("OpenRouter Chat.Send returned")
	//fmt.Printf("ERROR: %$v\n", err)
	//fmt.Printf("RESULT: %#v\v", result)

	if err != nil {
		return "", fmt.Errorf("OpenRouter request failed: %w\n", err)
	}

	content := result.ChatResult.Choices[0].Message.Content

	assistantContent, ok := content.Get()
	if !ok {
		return "", fmt.Errorf("no content in OpenRouter response")
	}

	if assistantContent.Str == nil {
		return "", fmt.Errorf("OpenRouter content has no string value")
	}

	return *assistantContent.Str, nil
}

func (g *OpenRouterAI) FetchModels() error {
	ctx := context.Background()

	// Looking for one model
	/* result, err := g.Client.Models.Get(ctx, "openai", "gpt-4")
	if err != nil {
		log.Fatal(err)
	} */

	/* models := append(models, ModelInfo{
		ID:   result.Result.Data.,
		Name: result.Data.Name,
	}) */

	result, err := g.Client.Models.List(ctx, &operations.GetModelsRequest{})
	if err != nil {
		log.Fatal(err)
	}

	// If multiple models
	var models []ModelInfo

	// try to add model count here to get available models (?)
	for _, model := range result.Result.Data {
		models = append(models, ModelInfo{
			ID:   model.ID,
			Name: model.Name,
		})
	}

	data, err := json.MarshalIndent(models, "", "    ")
	if err != nil {
		log.Fatal(err)
	}

	ModelFile := "openrouterModels.json"
	ModelPath := services.GetSettingsPath(ModelFile)

	return os.WriteFile(ModelPath, data, 0644)
}
