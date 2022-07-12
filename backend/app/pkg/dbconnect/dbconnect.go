package dbconnect

import (
	"github.com/pkg/errors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	dbString = "host=backend-db-1 user=postgres password=postgres dbname=test_app port=5432 sslmode=disable"
)

func ConnectDB() (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dbString), &gorm.Config{})
	if err != nil {
		return nil, errors.Wrap(err, "connecting to database")
	}

	return db, err
}
