package handlers

import "github.com/labstack/echo/v4"

type Handler struct {
	Method     string
	Path       string
	Handler    echo.HandlerFunc
	Middleware echo.MiddlewareFunc
}
