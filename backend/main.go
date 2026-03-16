package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

	"backend/provider.go/Agents/Cloud"

	"github.com/joho/godotenv"
)

func EnterPrompt() string {
	scanner := bufio.NewReader(os.Stdin)

	//Delete this later for frontend purposes
	fmt.Println("Please enter your prompt...")

	input, err := scanner.ReadString('\n')

	if err != nil {
		return "Error reading input"
	}

	cleanInput := strings.TrimSpace(input)
	return cleanInput
}

func main() {
	userprompt := EnterPrompt()
	doterr := godotenv.Load()

	if doterr != nil {
		log.Fatal("Error loading .env file")
	}

	//Get API Key
	apikey := os.Getenv("GEMINI_API_KEY")

	Cloud.CallLLM(userprompt, apikey, doterr)
}
