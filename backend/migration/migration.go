package main

import (
	"gin-fleamarket/infra"
	"gin-fleamarket/models"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	// 共通化したいが実行されるファイルが異なるため、.envのパスが代わり取得に失敗するので
	// 一旦initailize.goと同じ内容を記載
	if err := godotenv.Load("../.env"); err != nil {
		log.Fatal("Error loading .env file")
	}
	db := infra.SetupDB()

	if err := db.AutoMigrate(&models.Item{}, &models.User{}); err != nil {
		panic("Failed to migrate database")
	}
}
