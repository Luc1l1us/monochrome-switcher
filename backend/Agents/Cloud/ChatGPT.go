package Cloud

import (
	"context"
	"fmt"
	"monochrome-switcher/backend/core"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

type ChatGPT struct {
	Client *openai.Client
}

// func (g *ChatGPT) Generate(prompt string) (string, error) {
func (g *ChatGPT) Generate(messages []core.Message) (string, error) {
	ctx := context.Background()

	prompt := core.BuildPrompt(messages)

	// checking history
	fmt.Println("===== ChatGPT Prompt =====")
	fmt.Println(prompt)
	fmt.Println("=========================")
	// end of history

	result, err := g.Client.Responses.New(ctx, responses.ResponseNewParams{
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String(prompt)},
		Model: openai.ChatModelGPT5_2,
	})

	if err != nil {
		return "", err
	}

	return result.OutputText(), nil
}
