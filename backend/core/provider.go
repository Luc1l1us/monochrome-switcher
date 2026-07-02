package core

import (
	"monochrome-switcher/backend/conversation"
)

type Provider interface {
	//Generate(prompt string) (string, error)
	Generate(message []conversation.Message) (string, error)
}
