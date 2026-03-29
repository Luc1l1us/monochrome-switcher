package main

import (
	"log"
	"os"

	"backend/provider.go/Agents/Cloud"

	"github.com/joho/godotenv"
)

// func to receive prompt from frontend
func receivePrompt(receivedPrompt string, receivedAgent string) string {
	prompt := receivedPrompt
	return prompt
}

/*
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
*/

func whichLLM(LLM string, prompt string, apikey string, err error) {
	if LLM == "Gemini" {
		Cloud.CallGemini(prompt, apikey, err)
	} else if LLM == "Local" {
		//fix this for later
		Local.callLocal(prompt)
	}
}

func main() {
	//replace these variables with real names of AI/Agents
	agent := ""
	promptreceive := ""
	userprompt := receivePrompt(promptreceive, agent)
	//userprompt := EnterPrompt()
	doterr := godotenv.Load()

	//make a func that would set LLM to Gemini if the anchor or switch is set to Gemini
	LLM := agent

	if doterr != nil {
		log.Fatal("Error loading .env file")
	}

	//Get API Key
	apikey := os.Getenv("GEMINI_API_KEY")

	//call LLMDecider func or whichLLM
	whichLLM(LLM, userprompt, apikey, doterr)
}
