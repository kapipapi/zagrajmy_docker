package dbconnect

import (
	"fmt"
	"github.com/pkg/errors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

func createDBString() (string, error) {
	host, ok := os.LookupEnv("DB_CONTAINER_NAME")
	if !ok {
		return "", errors.New("No enviroment parameter: DB_CONTAINER_NAME")
	}

	return fmt.Sprintf("host=%s user=postgres password=postgres dbname=app port=5432 sslmode=disable", host), nil
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
