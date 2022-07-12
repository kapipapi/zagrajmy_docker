package posts

import (
	"backend/pkg/models"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"

	"gorm.io/gorm"
)

type Server interface {
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
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

	e.GET("/api/posts", s.getAllPosts)
}

func (s Service) getAllPosts(c echo.Context) error {
	var posts []models.Post
	err := s.db.WithContext(c.Request().Context()).Table("blog.posts").Find(&posts).Error
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	jsonBytes, err := json.Marshal(posts)
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSONBlob(http.StatusOK, jsonBytes)
}
