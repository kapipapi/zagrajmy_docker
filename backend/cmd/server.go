package main

import (
	"backend/pkg/api"
	"backend/pkg/dbconnect"
	"backend/pkg/migrations"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

func main() {
	log := logrus.New()

	db, err := dbconnect.ConnectDB()
	if err != nil {
		log.WithError(err)
		return
	}

	if err := migrations.RunMigrations(db); err != nil {
		log.WithError(errors.Wrap(err, "Running migrations"))
		return
	}

	s := api.New(db, log)
	s.Start()
}
