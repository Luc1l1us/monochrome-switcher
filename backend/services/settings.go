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

type APIKeys struct {
	Claude     string `json:"claude_key"`
	ChatGPT    string `json:"chatgpt_key"`
	Gemini     string `json:"gemini_key"`
	Perplexity string `json:"perplex_key"`
	DeepSeek   string `json:"deepseek_key"`
	Grok       string `json:"grok_key"`
}

func GetSettingsPath(filename string) string {
	exePath, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}

	appDir := filepath.Join(exePath, "monochrome-switcher")

	os.MkdirAll(appDir, os.ModePerm)

	return filepath.Join(appDir, filename)
}

func SaveSettings(settings Settings) error {
	SettingsPath := GetSettingsPath("settings.json")

	fmt.Println("ABS PATH:", SettingsPath)
	fmt.Println("SAVE PATH:", SettingsPath)

	data, err := json.MarshalIndent(settings, "", " ")
	if err != nil {
		return err
	}

	return os.WriteFile(SettingsPath, data, 0644)
}

func SaveAPIKeys(apis APIKeys) error {
	SettingsPath := GetSettingsPath("apikeys.json")

	fmt.Println("ABS PATH:", SettingsPath)
	fmt.Println("SAVE PATH:", SettingsPath)

	data, err := json.MarshalIndent(apis, "", " ")
	if err != nil {
		return err
	}

	return os.WriteFile(SettingsPath, data, 0644)
}

func LoadSettings() (Settings, error) {
	var settings Settings
	SettingsPath := GetSettingsPath("settings.json")

	file, err := os.ReadFile(SettingsPath)
	if err != nil {
		return settings, err
	}

	err = json.Unmarshal(file, &settings)
	return settings, err
}

func LoadAPIKeys() (APIKeys, error) {
	SettingsPath := GetSettingsPath("apikeys.json")

	var keys APIKeys

	data, err := os.ReadFile(SettingsPath)
	if err != nil {
		return keys, err
	}

	err = json.Unmarshal(data, &keys)
	return keys, err
}
