package Cloud

import (
	"context"
	"fmt"
	"monochrome-switcher/backend/core"

	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/components"
)

type OpenRouterAI struct {
	Client *openrouter.OpenRouter
}

func (g *OpenRouterAI) Generate(messages []core.Message) (string, error) {
	fmt.Printf("OpenRouter Generate called\n")
	fmt.Printf("OpenRouter client: %#v\n", g.Client)
	ctx := context.Background()

	prompt := core.BuildPrompt(messages)

	fmt.Println("About to call OpenRouter Chat.Send")
	result, err := g.Client.Chat.Send(
		ctx,
		components.ChatRequest{
			Model: openrouter.Pointer("google/gemini-2.5-flash"),
			Messages: []components.ChatMessages{
				components.CreateChatMessagesUser(
					components.ChatUserMessage{
						Content: components.CreateChatUserMessageContentStr(prompt),
						Role:    components.ChatUserMessageRoleUser,
					},
				),
			},
		}, nil,
	)

	if err != nil {
		return "", err
	}

	fmt.Println("OpenRouter Chat.Send returned")

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
