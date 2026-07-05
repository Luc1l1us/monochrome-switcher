package conversation

import (
	"fmt"
	"monochrome-switcher/backend/core"
)

type ConvoManager struct {
	Chats map[string][]core.Message
}

func NewManager() *ConvoManager {
	return &ConvoManager{
		Chats: make(map[string][]core.Message),
	}
}

func (m *ConvoManager) AddUserMessage(chatID, text string) {
	fmt.Printf("AddUserMessage: %q\n", text)
	m.Chats[chatID] = append(
		m.Chats[chatID],
		core.Message{
			Role:    "user",
			Content: text,
		},
	)
}

func (m *ConvoManager) AddAIAgentMessage(chatID, text string) {
	m.Chats[chatID] = append(
		m.Chats[chatID],
		core.Message{
			Role:    "assistant",
			Content: text,
		},
	)
}

func (m *ConvoManager) History(chatID string) []core.Message {
	return m.Chats[chatID]
}
