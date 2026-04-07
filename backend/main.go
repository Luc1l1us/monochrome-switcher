package main

import (
	//"context"
	"fmt"
	"log"

	//"os"

	//"backend/Agents/Cloud"
	//"backend/core"
	"backend/Config"

	//"google.golang.org/genai"

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

/* func whichLLM(LLM string, prompt string, apikey string, err error) {
	if LLM == "Gemini" {
		Cloud.CallGemini(prompt, apikey, err)
	} else if LLM == "Local" {
		//fix this for later
		Local.callLocal(prompt)
	}
} */

func main() {
	//ctx := context.Background()

	//replace these variables with real names of AI/Agents
	//agent := ""
	promptreceive := "Hello, I am testing out something. Can you list out the things or statements that I had sent in this thread?"
	//userprompt := receivePrompt(promptreceive, agent)
	//userprompt := EnterPrompt()

	doterr := godotenv.Load()

	//make a func that would set LLM to Gemini if the anchor or switch is set to Gemini
	//LLM := agent

	if doterr != nil {
		log.Fatal("Error loading .env file")
	}

	// Create Gemini Client
	//geminiClient, err := genai.NewClient(ctx, &genai.ClientConfig{
	//	APIKey:  os.Getenv("GEMINI_API_KEY"),
	//	Backend: genai.BackendGeminiAPI,
	//})

	//if err != nil {
	//	log.Fatal(err)
	//}

	//Initialize Gemini Client
	//gemini := &Cloud.Gemini{
	//	Client: geminiClient,
	//}

	//providers := map[string]core.Provider{
	//	"gemini": gemini,
	//}

	providers := Config.InitProviders()

	response, err := providers["gemini"].Generate(promptreceive)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(response)

	//call LLMDecider func or whichLLM
	//whichLLM(LLM, userprompt, apikey, doterr)
}
