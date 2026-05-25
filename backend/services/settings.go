package services

import (
	"encoding/json"
	"os"
	"path/filepath"
)

type Settings struct {
	Resizable      bool `json: "resizable"`
	MinimizeToTray bool `json: "minimizetotray"`
}

var SettingsPath = filepath.Join(".", "settings.json")

func SaveSettings(settings Settings) error {
	os.MkdirAll(filepath.Dir(SettingsPath), os.ModePerm)

	data, err := json.MarshalIndent(settings, "", " ")
	if err != nil {
		return err
	}

	return os.WriteFile(SettingsPath, data, 0644)
}

func LoadSettings() (Settings, error) {
	var settings Settings

	file, err := os.ReadFile(SettingsPath)
	if err != nil {
		return settings, err
	}

	err = json.Unmarshal(file, &settings)
	return settings, err
}
