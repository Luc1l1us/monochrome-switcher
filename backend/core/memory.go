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
type AgentState struct {
	Mode AgentMode `json:"mode"`
}

type AgentMode string

const (
	Single AgentMode = "single"
	Multi  AgentMode = "multi"
)

type Chat struct {
	ID         string     `json:"id"`
	Provider   string     `json:"provider"`
	Title      string     `json:"title"`
	CreatedAt  string     `json:"created_at"`
	Messages   []Message  `json:"messages"`
	ModelID    string     `json:"modelID"`
	AgentState AgentState `json:"agent_state"`
	SessionID  string     `json:"session_id"`
}

type ChatSummary struct {
	ID         string     `json:"id"`
	Provider   string     `json:"provider"`
	Title      string     `json:"title"`
	CreatedAt  string     `json:"created_at"`
	AgentState AgentState `json:"agent_state"`
	ModelID    string     `json:"modelID"`
	SessionID  string     `json:"session_id"`
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
