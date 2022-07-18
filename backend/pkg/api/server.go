package api

import (
	"backend/pkg/views/game"
	"backend/pkg/views/place"
	"backend/pkg/views/sport"
	"context"
	"gorm.io/gorm"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sirupsen/logrus"

	"backend/pkg/views/home"
	"backend/pkg/views/user"
)

type Service struct {
	Echo *echo.Echo
	Log  *logrus.Logger
}

func New(db *gorm.DB, log *logrus.Logger) Service {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORS())

	home.New(e)
	user.New(e, db)
	place.New(e, db)
	sport.New(e, db)
	game.New(e, db)

	e.Static("/images", "images")

	return Service{e, log}
}

func (s Service) Start() {
	go func() {
		if err := s.Echo.Start(":8080"); err != nil && err != http.ErrServerClosed {
			s.Log.Fatal("shutting down the server")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := s.Echo.Shutdown(ctx); err != nil {
		s.Log.Fatal(err)
	}
}
