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
	fmt.Printf("1. HandlePrompt is starting \n")

	fmt.Printf("Prompt received: %q\n", prompt)
	manager.AddUserMessage(chatID, prompt)
	fmt.Printf("2. User message added \n")

	provider, ok := providers[providerName]
	if !ok {
		return "", fmt.Errorf("provider %q not found! \n", providerName)
	}

	if provider == nil {
		return "", fmt.Errorf("provider %q is nil \n", providerName)
	}

	fmt.Println("3. Provider found \n", providerName)

	messages := manager.History(chatID)

	fmt.Printf("\n4. History retrieved \n")
	fmt.Println("message count \n", len(messages))

	response, err := provider.Generate(messages)

	fmt.Printf("5. Provider.Generate returned \n")

	if err != nil {
		fmt.Println("Provider error:", err)
		return "", fmt.Errorf("provider.Generate: %w", err)
	}

	fmt.Println("Provider returned response:")
	fmt.Printf("%q\n", response)

	fmt.Println("About to add AI message")

	/* response, err := providers[providerName].Generate(
		manager.History(chatID),
	)
	if err != nil {
		return "", err
	} */

	manager.AddAIAgentMessage(chatID, response)
	fmt.Printf("6. AI message added \n")
	//save prompts and responses to a file
	chat := manager.Chats[chatID]
	err = conversation.SaveChat(chat)
	return response, nil
}
