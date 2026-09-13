package Cloud

import (
	"context"
	"fmt"
	"monochrome-switcher/backend/core"
	"os"
	"time"

	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/components"
	"github.com/OpenRouterTeam/go-sdk/optionalnullable"
)

type OpenRouterAI struct {
	Client *openrouter.OpenRouter
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

func (g *OpenRouterAI) FetchModels() {
	ctx := context.Background()

	openrouterClient := openrouter.New(
		openrouter.WithSecurity(keys.OpenRouter),
	)
	if err != nil {
		return "", fmt.Errorf("Wrong or no API Key present for OpenRouter! %w\n", err)
	}

	result, err := 
}