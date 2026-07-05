package main

//TODO import does not work again, try to fix later
// it is because it is from a separate folder, try to fix this later
import (
	"context"
	"fmt"
	"monochrome-switcher/backend/config"
	"monochrome-switcher/backend/conversation"
	"monochrome-switcher/backend/core"
	"monochrome-switcher/backend/services"
	"os"
	"os/exec"
	osRuntime "runtime"
	"syscall"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx       context.Context
	manager   *conversation.ConvoManager
	providers map[string]core.Provider
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		manager:   conversation.NewManager(),
		providers: config.InitProviders(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	width := 1024
	height := 768

	screens, _ := runtime.ScreenGetAll(a.ctx)
	primary := screens[0]

	x := primary.Size.Width - width
	y := primary.Size.Height - height

	runtime.WindowSetPosition(a.ctx, x, y)
}

func (a *App) SendPrompt(ChatID string, ProviderName string, Prompt string) string {
	fmt.Printf("SendPrompt got: %q\n", Prompt)
	result, err := services.HandlePrompt(
		a.manager,
		a.providers,
		ChatID,
		ProviderName,
		Prompt,
	)
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

// Settings funcs here
func (a *App) SaveSettings(settings services.Settings) error {
	return services.SaveSettings(settings)
}

func (a *App) LoadSettings() (services.Settings, error) {
	return services.LoadSettings()
}

func (a *App) SaveAPIKeys(apis services.APIKeys) error {
	return services.SaveAPIKeys(apis)
}

func (a *App) LoadAPIKeys() (services.APIKeys, error) {
	return services.LoadAPIKeys()
}

// Apply settings in realtime
func (a *App) ReloadApp(_ ...any) {
	self, _ := os.Executable()
	args := os.Args
	env := os.Environ()
	if osRuntime.GOOS == "windows" {
		cmd := exec.Command(self, args[1:]...)
		cmd.Env = env
		if err := cmd.Start(); err == nil {
			os.Exit(0)
		}
	} else {
		syscall.Exec(self, args, env)
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
