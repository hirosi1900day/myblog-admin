package infra

import (
	"log"

	"github.com/joho/godotenv"
)

func Initialize() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}
}
