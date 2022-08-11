package dbconnect

import (
	"github.com/pkg/errors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func createDBString() (string, error) {
	return "host=db user=postgres password=postgres dbname=app port=5432 sslmode=disable", nil
}

func ConnectDB() (*gorm.DB, error) {
	dbString, err := createDBString()
	if err != nil {
		return nil, errors.Wrap(err, "creating db connection string")
	}

	db, err := gorm.Open(postgres.Open(dbString), &gorm.Config{})
	if err != nil {
		return nil, errors.Wrap(err, "connecting to database")
	}

	return db, err
}
