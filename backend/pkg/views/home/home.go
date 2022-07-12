package home

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

type Server interface {
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

func New(s Server) {
	s.GET("/api", func(c echo.Context) error {
		return c.HTML(http.StatusOK, "Home page!")
	})
}
