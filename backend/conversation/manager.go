package conversation

import (
	"encoding/json"
	"fmt"
	"monochrome-switcher/backend/core"
	"os"
	"path/filepath"

	"github.com/google/uuid"
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

func (m *ConvoManager) LoadChat(chatID string, history []core.Message) {
	m.Chats[chatID] = history
}

func (m *ConvoManager) CreateChat(provider string) string {
	id := uuid.New().String()

	m.Chats[id] = []core.Message{}

	return id
}

func (m *ConvoManager) LoadChatHistory(chatID string, history []core.Message) {
	m.Chats[chatID] = history
}

func GetConvoPath(filename string) string {
	exePath, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}

	ConvoDir := filepath.Join(exePath, "monochrome-switcher", "Chat")
	os.MkdirAll(ConvoDir, os.ModePerm)

	return filepath.Join(ConvoDir, filename)
}

// func SaveChat(chat Chat) error { use this in the future
func SaveChat(chatID string, messages []core.Message) error {
	data, err := json.MarshalIndent(messages, "", "   ")
	if err != nil {
		return err
	}

	historyid := "history - " + chatID + ".json"
	ChatPath := GetConvoPath(historyid)

	return os.WriteFile(ChatPath, data, 0644)
}

func LoadChat(chatID string) ([]core.Message, error) {
	data, err := os.ReadFile(
		filepath.Join(
			"history - ", chatID+".json",
		),
	)

	if err != nil {
		return nil, err
	}

	var history []core.Message

	err = json.Unmarshal(data, &history)

	return history, err
}
