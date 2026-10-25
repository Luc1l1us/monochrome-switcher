package main

//TODO import does not work again, try to fix later
// it is because it is from a separate folder, try to fix this later
import (
	"context"
	"fmt"
	"log"
	"monochrome-switcher/backend/Agents/Cloud"
	"monochrome-switcher/backend/config"
	"monochrome-switcher/backend/conversation"
	"monochrome-switcher/backend/core"
	"monochrome-switcher/backend/services"
	"os"
	"os/exec"
	osRuntime "runtime"
	"syscall"

	"github.com/google/uuid"

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

	w, h := runtime.WindowGetSize(ctx)
	screens, _ := runtime.ScreenGetAll(ctx)
	screen := screens[0]
	for _, s := range screens {
		if s.IsPrimary {
			screen = s
			break
		}
	}
	runtime.WindowSetPosition(ctx, screen.Size.Width-w, screen.Size.Height-h)

	//Get or Fetch models from OpenRouter at startup
	//Primitive, will need to revamp this soon
	openRouter, err := a.providers["openrouter"].(*Cloud.OpenRouterAI)
	if !err {
		log.Println("OpenRouter provider not found!")
	}
	if err := openRouter.FetchModels(); err != nil {
		log.Printf("Failed to fetch OpenRouter models %v", err)
	}
}

func (a *App) SetWidthAnchoredBottomRight(newWidth, newHeight int) {
	x, y := runtime.WindowGetPosition(a.ctx)
	w, h := runtime.WindowGetSize(a.ctx)
	rightEdge := x + w
	bottomEdge := y + h

	runtime.WindowSetPosition(a.ctx, rightEdge-newWidth, bottomEdge-newHeight)
	runtime.WindowSetSize(a.ctx, newWidth, newHeight)
}

func (a *App) GetOpenRouterModels() ([]Cloud.ModelInfo, error) {
	openRouter, ok := a.providers["openrouter"].(*Cloud.OpenRouterAI)
	if !ok {
		log.Println("OpenRouter provider not found or has an unexpected type")
	}
	models, err := openRouter.ReadOpenRouterModels()
	if err != nil {
		return nil, err
	}
	return models, nil
}

func (a *App) SendPrompt(ChatID string, ProviderName string, Prompt string, ModelID string) (string, error) {
	chat, ok := a.manager.Chats[ChatID]
	if !ok || chat == nil {
		return "", fmt.Errorf("chat with this chatID %q is not found", ChatID)
	}
	//store old title
	oldTitle := chat.Title
	result, err := services.HandlePrompt(
		a.manager,
		a.providers,
		ChatID,
		ProviderName,
		Prompt,
		ModelID,
	)
	if err != nil {
		fmt.Println("SendPrompt returning error: ", err)
		return "", err
	}
	//debugging
	chat = a.manager.Chats[ChatID]
	if chat == nil {
		fmt.Printf("Chat %q not found after HandlePrompt:", ChatID)
	} else {
		fmt.Printf("Before Title : %q, after title: %q/n", oldTitle, chat.Title)

		if chat.Title != oldTitle {
			fmt.Println("Emitting chat:title-updated event")
			runtime.EventsEmit(a.ctx, "chat:title-updated", map[string]string{
				"chatID": ChatID,
				"title":  chat.Title,
			})
		} else {
			fmt.Println("Title did not change; event not emitted")
		}
	}
	return result, nil
}

func (a *App) CreateChat(provider string, modelID string, state string, sessionID string) (string, error) {
	id := uuid.New().String()

	chat := a.manager.CreateChat(id, provider, modelID, state, sessionID)
	fmt.Printf("CreateChat Provider got: %q\n", provider+state+sessionID)

	err := conversation.SaveChat(chat)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (a *App) ListChats() (*core.ChatList, error) {
	return conversation.ListChats()
}

func (a *App) LoadOneChat(chatID string, modelID string) (*core.Chat, error) {
	chat, err := conversation.LoadChat(chatID)
	if err != nil {
		return nil, err
	}

	a.manager.LoadChat(chat)
	return chat, nil
}

func (a *App) LoadChatsBySession(sessionID string) ([]core.Chat, error) {
	chat, err := conversation.LoadChatBySession(sessionID)
	if err != nil {
		return nil, err
	}
	return chat, nil
}

func (a *App) ListRecentChats(limit int) (*core.ChatList, error) {
	return conversation.LimitChat(limit)
}

func (a *App) DeleteOneChat(chatID string) {
	conversation.DeleteChat(chatID)
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
