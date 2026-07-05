package core

import (
	"strings"
)

type Message struct {
	Role    string
	Content string
}

type Conversation struct {
	Messages []Message
}

type Chat struct {
	ID       string
	Provider string
	Messages []Message
}

func BuildPrompt(messages []Message) string {
	var builder strings.Builder

	for _, msg := range messages {
		builder.WriteString(msg.Role)
		builder.WriteString(": ")
		builder.WriteString(msg.Content)
		builder.WriteString("\n")
	}

	return builder.String()
}
