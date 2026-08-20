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
	ctx := context.Background()

	prompt := core.BuildPrompt(messages)

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

	content := result.ChatResult.Choices[0].Message.Content

	assistantContent, test := content.Get()

	fmt.Println(assistantContent, test)

	fmt.Printf("%T\n", assistantContent)
	fmt.Printf("%v\n", assistantContent)
	return *assistantContent.Str, err
}
