package migrations

import (
	"backend/pkg/models"
	"gorm.io/gorm"
)

func migration0() func(db *gorm.DB) error {
	return func(db *gorm.DB) error {
		return db.Debug().AutoMigrate(models.User{}, models.Sport{}, models.Place{}, models.Game{})
	}
}
