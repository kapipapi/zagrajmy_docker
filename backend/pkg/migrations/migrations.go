package migrations

import (
	"fmt"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) error {
	log := logrus.New()

	ms := []func(db *gorm.DB) error{
		migration0(),
	}

	for i, m := range ms {
		if err := m(db); err != nil {
			log.WithError(err)
			return errors.Wrap(err, fmt.Sprintf("Mingration %d rise error. Stopping migration", i))
		}
	}

	return nil
}
