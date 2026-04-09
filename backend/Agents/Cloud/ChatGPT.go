package Cloud

import (
	"context"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

type ChatGPT struct {
	Client *openai.Client
}

func (g *ChatGPT) Generate(prompt string) (string, error) {
	ctx := context.Background()

	result, err := g.Client.Responses.New(ctx, responses.ResponseNewParams{
		Input: responses.ResponseNewParamsInputUnion{OfString: openai.String(prompt)},
		Model: openai.ChatModelGPT5_2,
	})

	if err != nil {
		return "", err
	}

	return result.OutputText(), nil
}
