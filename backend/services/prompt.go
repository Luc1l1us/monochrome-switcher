package services

import (
	//unused imports
	"fmt"
	//"log"
	//"backend/config"
	"monochrome-switcher/backend/core"
	//"github.com/joho/godotenv"
)

func HandlePrompt(prompt string, agent string, providers map[string]core.Provider) (string, error) {
	provider, ok := providers[agent]
	if !ok {
		return "", fmt.Errorf("Invalid Agent Selected")
	}

	return provider.Generate(prompt)
}
