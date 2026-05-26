package services

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Settings struct {
	Resizable      bool `json:"resizable"`
	MinimizeToTray bool `json:"minimizetotray"`
}

// this is not working
func GetSettingsPath() string {
	exePath, _ := os.Executable()
	cwd, _ := os.Getwd()

	fmt.Println("EXE:", exePath)
	fmt.Println("CWD:", cwd)

	dir := filepath.Join(filepath.Dir(exePath), "config")

	fmt.Println("CONFIG DIR:", dir)

	os.MkdirAll(dir, os.ModePerm)

	return filepath.Join(dir, "settings.json")
}

//var SettingsPath = filepath.Join(".", "settings.json")

var SettingsPath = GetSettingsPath()

func SaveSettings(settings Settings) error {
	data, err := json.MarshalIndent(settings, "", " ")
	if err != nil {
		return err
	}

	fmt.Println("ABS PATH:", SettingsPath)
	fmt.Println("SAVE PATH:", SettingsPath)
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
