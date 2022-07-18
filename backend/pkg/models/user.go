package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name  string
	Games []*Game `gorm:"many2many:user_games;"`
}
