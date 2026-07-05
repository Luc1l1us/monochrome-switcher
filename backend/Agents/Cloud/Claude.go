package Cloud

import (
	"context"
	"monochrome-switcher/backend/core"

	"github.com/anthropics/anthropic-sdk-go"
)

type Claude struct {
	Client *anthropic.Client
}

// func (g *Claude) Generate(prompt string) (string, error) {
func (g *Claude) Generate(messages []core.Message) (string, error) {

	prompt := core.BuildPrompt(messages)

	result, err := g.Client.Messages.New(context.TODO(), anthropic.MessageNewParams{
		MaxTokens: 1024,
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(anthropic.NewTextBlock(prompt)),
		},
		Model: anthropic.ModelClaudeOpus4_6,
	})

	if err != nil {
		panic(err.Error())
	}

	var resultContent string
	for _, block := range result.Content {
		if block.Type == "Text" {
			resultContent += block.Text
		}
	}

	return resultContent, nil
}
