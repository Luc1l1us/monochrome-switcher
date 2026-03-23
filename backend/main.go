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

func whichLLM(LLM string, prompt string, apikey string, err error) {
	if LLM == "Gemini" {
		Cloud.CallGemini(prompt, apikey, err)
	} else if LLM == "Local" {
		Local.callLocal(prompt)
	}
}

func main() {
	userprompt := EnterPrompt()
	doterr := godotenv.Load()

	//make a func that would set LLM to Gemini if the anchor or switch is set to Gemini
	LLM := "Gemini"

	if doterr != nil {
		log.Fatal("Error loading .env file")
	}

	//Get API Key
	apikey := os.Getenv("GEMINI_API_KEY")

	whichLLM(LLM, userprompt, apikey, doterr)
}
