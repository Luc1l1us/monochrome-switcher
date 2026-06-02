package services

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Settings struct {
	Resizable       bool `json:"resizable"`
	MinimizeToTray  bool `json:"minimizetotray"`
	LaunchOnStartup bool `json:"launchonstartup"`
	Transparency    bool `json:"transparency"`
}

// this is not working
func GetSettingsPath() string {
	exePath, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}

	appDir := filepath.Join(exePath, "monochrome-switcher")

	os.MkdirAll(appDir, os.ModePerm)

	return filepath.Join(appDir, "settings.json")
}

func SaveSettings(settings Settings) error {
	SettingsPath := GetSettingsPath()

	fmt.Println("ABS PATH:", SettingsPath)
	fmt.Println("SAVE PATH:", SettingsPath)

	data, err := json.MarshalIndent(settings, "", " ")
	if err != nil {
		return err
	}

	return os.WriteFile(SettingsPath, data, 0644)
}

func LoadSettings() (Settings, error) {
	var settings Settings
	SettingsPath := GetSettingsPath()

	file, err := os.ReadFile(SettingsPath)
	if err != nil {
		return settings, err
	}

	err = json.Unmarshal(file, &settings)
	return settings, err
}
