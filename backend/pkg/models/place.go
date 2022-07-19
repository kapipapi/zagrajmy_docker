package models

import "gorm.io/gorm"

type Place struct {
	gorm.Model
	Name        string
	Address     string
	Games       []Game
	Sports      []*Sport `gorm:"many2many:place_sports;"`
	LocationLat float64
	LocationLon float64
}
