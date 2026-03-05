package main

import "fmt"

func main() {

	var prompt string

	fmt.Println("Please enter your prompt...")
	fmt.Scanln(&prompt)
	result := chatGPTProvider(prompt)
	fmt.Println(result)
}

func check_online() {

}

func chatGPTProvider(prompt string) string {
	var response = " prompt received"
	var result = prompt + response
	return result
}

func localAIProvider(prompt string) string {
	var response = " prompt received"
	var result = prompt + response
	return result
}
