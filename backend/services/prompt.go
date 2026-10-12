package services

import (
	//unused imports
	//"log"
	//"backend/config"
	"fmt"
	"log"
	"monochrome-switcher/backend/conversation"
	"monochrome-switcher/backend/core"
	"strings"
	//"github.com/joho/godotenv"
)

func HandlePrompt(
	manager *conversation.ConvoManager,
	providers map[string]core.Provider,
	chatID string,
	providerName string,
	prompt string,
	modelID string,
) (string, error) {
	provider, ok := providers[providerName]
	if !ok {
		return "", fmt.Errorf("provider %q not found! \n", providerName)
	}

	if provider == nil {
		return "", fmt.Errorf("provider %q is nil \n", providerName)
	}

	manager.AddUserMessage(chatID, prompt)
	messages := manager.History(chatID)
	response, err := provider.Generate(messages, modelID)
	if err != nil {
		fmt.Println("Provider error:", err)
		return "", fmt.Errorf("provider.Generate: %w", err)
	}

	manager.AddAIAgentMessage(chatID, response)
	chat, ok := manager.Chats[chatID]
	if !ok || chat == nil {
		return "", fmt.Errorf("chat %q not found in conversation manager!", chatID)
	}

	if err := conversation.SaveChat(chat); err != nil {
		return "", fmt.Errorf("Save conversation: %w", err)
	}

	if chat.Title == "New Chat" && strings.TrimSpace(prompt) != "" {
		title, TitleErr := GenerateTitle(provider, prompt, modelID)
		if TitleErr != nil {
			log.Printf("Failed to generate chat title: %v", TitleErr)
		} else if title != "" {
			chat.Title = title
			if err := conversation.SaveChat(chat); err != nil {
				log.Printf("Failed to save generated chat title: %v", err)
			}
		}
	}
	return response, nil
}

func GenerateTitle(provider core.Provider, firstPrompt string, modelID string) (string, error) {
	messages := []core.Message{
		{
			Role: "user",
			Content: `Generate a concise title for this conversation.
					Rules: 
						- Use 3-8 words.
						- Describe the main topic.
						- Do not use quotation marks.
						- Return only the title.
						
						First user message: ` + firstPrompt,
		},
	}
	title, err := provider.Generate(messages, modelID)
	if err != nil {
		return "", err
	}
	title = strings.TrimSpace(title)
	title = strings.Trim(title, `"'`)
	title = strings.Join(strings.Fields(title), " ")

	return title, nil
}
