package conversation

import (
	"encoding/json"
	"fmt"
	"monochrome-switcher/backend/core"
	"os"
	"path/filepath"
	"time"
)

type ConvoManager struct {
	//Chats map[string][]core.Message
	Chats map[string]*core.Chat
}

func NewManager() *ConvoManager {
	return &ConvoManager{
		Chats: make(map[string]*core.Chat),
		//Chats: make(map[string]*core.Chat),
	}
}

func (m *ConvoManager) AddUserMessage(chatID, text string) {
	fmt.Printf("AddUserMessage: %q\n", text)
	m.Chats[chatID].Messages = append(
		m.Chats[chatID].Messages,
		core.Message{
			Role:    "user",
			Content: text,
		},
	)
}

func (m *ConvoManager) AddAIAgentMessage(chatID, text string) {
	m.Chats[chatID].Messages = append(
		m.Chats[chatID].Messages,
		core.Message{
			Role:    "assistant",
			Content: text,
		},
	)
}

func (m *ConvoManager) History(chatID string) []core.Message {
	return m.Chats[chatID].Messages
}

func (m *ConvoManager) LoadChat(chat *core.Chat) {
	m.Chats[chat.ID] = chat
}

func (m *ConvoManager) CreateChat(chatID, provider string) *core.Chat {
	chat := &core.Chat{
		ID:        chatID,
		Provider:  provider,
		Title:     "New Chat",
		CreatedAt: time.Now().Format(time.RFC3339),
		Messages:  []core.Message{},
	}

	m.Chats[chatID] = chat

	return chat
}

func (m *ConvoManager) LoadChatHistory(chatID string, history []core.Message) {
	m.Chats[chatID].Messages = history
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

func GetConvoDir() string {
	exePath, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}

	ConvoDir := filepath.Join(exePath, "monochrome-switcher", "Chat")
	os.MkdirAll(ConvoDir, os.ModePerm)

	return ConvoDir
}

// func SaveChat(chat Chat) error { use this in the future
func SaveChat(chat *core.Chat) error {
	data, err := json.MarshalIndent(chat, "", "   ")
	if err != nil {
		return err
	}

	//historyid := "history - " + chat.ID + ".json"
	historyid := chat.ID + ".json"
	ChatPath := GetConvoPath(historyid)

	return os.WriteFile(ChatPath, data, 0644)
}

// Load oneChat
func LoadChat(chatID string) (*core.Chat, error) {
	//filename := "history - " + chatID + ".json"
	filename := chatID + ".json"

	data, err := os.ReadFile(GetConvoPath(filename))
	if err != nil {
		return nil, err
	}

	var chat core.Chat
	err = json.Unmarshal(data, &chat)
	if err != nil {
		return nil, err
	}
	return &chat, nil
}

// Load All chats
func ListChats() ([]core.ChatSummary, error) {
	entries, err := os.ReadDir(GetConvoDir())
	if err != nil {
		return nil, err
	}

	chats := make([]core.ChatSummary, 0)
	//var chats []core.ChatSummary

	for _, entry := range entries {

		if entry.IsDir() {
			continue
		}

		if filepath.Ext(entry.Name()) != ".json" {
			continue
		}

		data, err := os.ReadFile(
			filepath.Join(GetConvoDir(), entry.Name()),
		)
		if err != nil {
			continue
		}

		var chat core.Chat

		err = json.Unmarshal(data, &chat)
		if err != nil {
			continue
		}

		parsedTime, err := time.Parse(time.RFC3339, chat.CreatedAt)

		readableTime := parsedTime.Format("January 2, 2006 at 3:04 PM")

		chats = append(chats, core.ChatSummary{
			ID:        chat.ID,
			Provider:  chat.Provider,
			Title:     chat.Title,
			CreatedAt: readableTime,
		})
	}
	return chats, nil
}
