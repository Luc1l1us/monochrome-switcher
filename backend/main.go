package main

import (
	"backend/provider.go/Agents/Cloud"
	"fmt"
)

func EnterPrompt() string {

	var prompt string

	fmt.Println("Please enter your prompt...")
	fmt.Scanln(&prompt)
	result := chatGPTProvider(prompt)
	fmt.Println(result)
	return result
}

func main() {
	EnterPrompt()
	userprompt := EnterPrompt()
	Cloud.CallLLM(userprompt)
}
