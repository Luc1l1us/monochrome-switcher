package services

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadDotEnv() {
	doterr := godotenv.Load("../.env")
	if doterr != nil {
		log.Fatal("Error loading .env file")
	}
}
