package migrations

import (
	"backend/pkg/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

func mockUsers(db *gorm.DB) error {
	users := []models.User{
		{Name: "Antoni"},
		{Name: "Jakub"},
		{Name: "Jan"},
		{Name: "Szymon"},
		{Name: "Franciszek"},
		{Name: "Filip"},
		{Name: "Aleksande"},
		{Name: "Mikołaj"},
		{Name: "Wojciech"},
		{Name: "Kacper"},
	}

	return db.Debug().Create(&users).Error
}

func generateMock(db *gorm.DB) error {
	var count int64
	if err := db.Model(&models.User{}).Count(&count).Error; err != nil {
		return errors.Wrap(err, "counting number of users")
	}

	if count < 1 {
		if err := mockUsers(db); err != nil {
			return errors.Wrap(err, "generating mock users")
		}
	}

	return nil
}
