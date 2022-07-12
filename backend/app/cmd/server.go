package main

import (
	"backend/pkg/api"
	"backend/pkg/dbconnect"
	"github.com/sirupsen/logrus"
)

func main() {
	log := logrus.New()

	db, err := dbconnect.ConnectDB()
	if err != nil {
		log.WithError(err)
		return
	}

	s := api.New(db, log)
	s.Start()
}
