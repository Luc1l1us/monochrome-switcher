package services

import (
	//unused imports
	//"log"
	//"backend/config"
	"fmt"
	"monochrome-switcher/backend/conversation"
	"monochrome-switcher/backend/core"
	//"github.com/joho/godotenv"
)

func HandlePrompt(
	manager *conversation.ConvoManager,
	providers map[string]core.Provider,
	chatID string,
	providerName string,
	prompt string,
) (string, error) {
	fmt.Printf("Prompt received: %q\n", prompt)
	manager.AddUserMessage(chatID, prompt)

	response, err := providers[providerName].Generate(
		manager.History(chatID),
	)
	if err != nil {
		return "", err
	}

	manager.AddAIAgentMessage(chatID, response)
	return response, nil
}
