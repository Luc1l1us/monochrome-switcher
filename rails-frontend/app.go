package main

//TODO import does not work again, try to fix later
import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// TODO still needs to receive agent string here
func (a *App) SendPrompt(prompt string, recagent string) string {
	executable.receivedPrompt(prompt, recagent)
	return fmt.Sprintf("Hello user, Here is your prompt: %s", prompt)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
