package models

import "gorm.io/gorm"

type Place struct {
	gorm.Model
	Name    string
	Address string
	Games   []Game
}
