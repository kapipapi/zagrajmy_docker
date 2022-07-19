package migrations

import (
	"backend/pkg/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

func generateMock(db *gorm.DB) error {
	var count int64
	if err := db.Model(&models.User{}).Count(&count).Error; err != nil {
		return errors.Wrap(err, "counting number of user")
	}

	if count < 1 {
		if err := mockUsers(db); err != nil {
			return errors.Wrap(err, "generating mock user")
		}
	}

	if err := db.Model(&models.Sport{}).Count(&count).Error; err != nil {
		return errors.Wrap(err, "counting number of user")
	}
	if count < 1 {
		if err := mockSports(db); err != nil {
			return errors.Wrap(err, "generating mock sports")
		}
	}

	if err := db.Model(&models.Place{}).Count(&count).Error; err != nil {
		return errors.Wrap(err, "counting number of user")
	}
	if count < 1 {
		if err := mockPlaces(db); err != nil {
			return errors.Wrap(err, "generating mock places")
		}
	}

	return nil
}

func mockUsers(db *gorm.DB) error {
	users := []models.User{
		{Name: "Antoni"},
		{Name: "Jakub"},
		{Name: "Jan"},
		{Name: "Szymon"},
	}

	return db.Debug().Create(&users).Error
}

func mockPlaces(db *gorm.DB) error {
	users := []models.Place{
		{
			Name:    "Boisko XXI LO z Oddziałami Sportowymi",
			Address: "Kołobrzeska 77, 80-396 Gdańsk",
			Sports: []*models.Sport{
				{Model: gorm.Model{ID: 1}},
				{Model: gorm.Model{ID: 2}},
			},
			LocationLat: 54.406813,
			LocationLon: 18.603876,
		},
		{
			Name:    "XX LO im. Zbigniewa Herberta",
			Address: "Antoniego Dobrowolskiego 6, 80-287 Gdańsk",
			Sports: []*models.Sport{
				{Model: gorm.Model{ID: 1}},
				{Model: gorm.Model{ID: 2}},
			},
			LocationLat: 54.361677,
			LocationLon: 18.588700,
		},
	}

	return db.Debug().Create(&users).Error
}

func mockSports(db *gorm.DB) error {
	sports := []models.Sport{
		{Name: "Basketball"},
		{Name: "Football"},
	}
	return db.Debug().Create(&sports).Error
}
