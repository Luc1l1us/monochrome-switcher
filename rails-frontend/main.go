package main

import (
	"embed"
	"fmt"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"monochrome-switcher/backend/services"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Run LoadSettings
	settings, error := services.LoadSettings()
	if error != nil {
		fmt.Println("Could not load settings, using default")
		settings = services.Settings{
			Resizable:       true,
			MinimizeToTray:  true,
			LaunchOnStartup: false,
			Transparency:    false,
		}
	}

	// Create application with options
	err := wails.Run(&options.App{
		Title:         "rails-frontend",
		Frameless:     true,
		Width:         1024,
		MaxWidth:      1024,
		MaxHeight:     768,
		Height:        768,
		DisableResize: !settings.Resizable,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 30, G: 30, B: 30, A: 1},

		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
