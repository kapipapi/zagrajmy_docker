package game

import (
	"backend/pkg/models"
	"encoding/json"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type Server interface {
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	POST(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

type Service struct {
	e  Server
	db *gorm.DB
}

func New(e Server, db *gorm.DB) {
	s := Service{
		e:  e,
		db: db,
	}

	e.GET("/api/games/get", s.getGames)
	e.POST("/api/games/new", s.createNewGame)
}

func (s Service) getGames(c echo.Context) error {

	var dto []models.Game
	err := s.db.
		Debug().
		WithContext(c.Request().Context()).
		Preload("Users").
		Table("public.games").
		Find(&dto).Error
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	jsonBytes, err := json.Marshal(dto)
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSONBlob(http.StatusOK, jsonBytes)
}

type requestGameModel struct {
	SportID  string `json:"sport_id,omitempty"`
	PlaceID  string `json:"place_id,omitempty"`
	Datetime string `json:"start_datetime,omitempty"`
	UsersIDs string `json:"users_ids,omitempty"`
}

func (s Service) createNewGame(c echo.Context) error {
	var g requestGameModel
	if err := c.Bind(&g); err != nil {
		return errors.Wrap(err, "binding request data")
	}

	timeParsed, err := time.Parse("2006-01-02T15:04", g.Datetime)
	if err != nil {
		return errors.Wrap(err, "parsing datetime")
	}

	sportIDParsed, err := strconv.ParseUint(g.SportID, 10, 32)
	if err != nil {
		return errors.Wrap(err, "parsing sport id")
	}

	placeIDParsed, err := strconv.ParseUint(g.PlaceID, 10, 32)
	if err != nil {
		return errors.Wrap(err, "parsing place id")
	}

	p := models.Game{
		SportID:       uint(sportIDParsed),
		PlaceID:       uint(placeIDParsed),
		StartDatetime: timeParsed,
	}

	if err = s.db.Debug().WithContext(c.Request().Context()).Create(&p).Error; err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	var usersIDs []*models.User
	for _, id := range strings.Split(g.UsersIDs, ",") {
		uidParsed, err := strconv.ParseUint(id, 10, 32)
		if err != nil {
			return errors.Wrap(err, "parsing user id")
		}

		usersIDs = append(usersIDs, &models.User{
			Model: gorm.Model{
				ID: uint(uidParsed),
			},
		})
	}

	if err := s.db.Debug().
		WithContext(c.Request().Context()).
		Model(&p).
		Association("Users").
		Append(usersIDs); err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	jsonBytes, err := json.Marshal(p)
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSONBlob(http.StatusOK, jsonBytes)
}
