package core

import (
	"strings"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type Conversation struct {
	Messages []Message
}

type Chat struct {
	ID         string    `json:"id"`
	Provider   string    `json:"provider"`
	Title      string    `json:"title"`
	AgentState string    `json:"state"`
	CreatedAt  string    `json:"created_at"`
	Messages   []Message `json:"messages"`
}

type ChatSummary struct {
	ID         string `json:"id"`
	Provider   string `json:"provider"`
	Title      string `json:"title"`
	CreatedAt  string `json:"created_at"`
	AgentState string `json:"state"`
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
