package models

import (
	"gorm.io/gorm"
	"time"
)

type Game struct {
	gorm.Model
	SportID       uint
	PlaceID       uint
	Users         []*User `gorm:"many2many:user_games;"`
	StartDatetime time.Time
}
