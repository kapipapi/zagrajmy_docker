package migrations

import (
	"fmt"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

func RunMigrations(db *gorm.DB) error {
	ms := []func(db *gorm.DB) error{
		migration0(),
	}

	for i, m := range ms {
		if err := m(db); err != nil {
			return errors.Wrap(err, fmt.Sprintf("Mingration %d rise error. Stopping migration", i))
		}
	}

	if err := generateMock(db); err != nil {
		return errors.Wrap(err, "Generating mock tables")
	}

	return nil
}
