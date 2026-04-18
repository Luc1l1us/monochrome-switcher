package main

//TODO import does not work again, try to fix later
// it is because it is from a separate folder, try to fix this later
import (
	//"backend/services"
	//"backend/core"
	//"backend/config"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx       context.Context
	providers map[string]core.Provider
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		providers: config.InitProviders(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SendPrompt(prompt string, agent string) string {
	result, err := services.HandlePrompt(prompt, agent, a.providers)
	if err != nil {
		return err.Error()
	}

	return result
}

// TODO still needs to receive agent string here
// This does not work but we'll let it stay for now
/* func (a *App) SendPrompt(prompt string, recagent string) string {
	executable.receivedPrompt(prompt, recagent)
	return fmt.Sprintf("Hello user, Here is your prompt: %s", prompt)
} */

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
