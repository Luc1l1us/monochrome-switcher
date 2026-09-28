package core

type Provider interface {
	//Generate(prompt string) (string, error)
	Generate(message []Message, modelID string) (string, error)
}
