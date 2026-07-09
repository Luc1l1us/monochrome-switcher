package core

import (
	"strings"
	"time"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type Conversation struct {
	Messages []Message
}

type Chat struct {
	ID        string    `json:"id"`
	Provider  string    `json:"provider"`
	CreatedAT time.Time `json:"createdAt"`
	Messages  []Message `json:"messages"`
}

type ChatSummary struct {
	ID       string
	Provider string
	LastUsed time.Time
	Title    string
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
