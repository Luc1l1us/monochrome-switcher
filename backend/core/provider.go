package core

type Provider interface {
	Generate(prompt string) (string, error)
}
