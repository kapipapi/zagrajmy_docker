package models

import "gorm.io/gorm"

type Sport struct {
	gorm.Model
	Name  string
	Games []Game
}
