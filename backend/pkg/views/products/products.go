package products

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

	e.GET("/api/products", s.getAllProducts)
	e.GET("/api/product/:productId", s.getProductById)
	e.POST("/api/product/new", s.newProduct)
}

func (s Service) getAllProducts(c echo.Context) error {
	var products []models.Product
	err := s.db.Debug().WithContext(c.Request().Context()).Table("shop.products").Find(&products).Error
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	jsonBytes, err := json.Marshal(products)
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSONBlob(http.StatusOK, jsonBytes)
}

type OKResponse struct {
	OK bool `json:"ok"`
}

func (s Service) newProduct(c echo.Context) error {
	var p models.Product
	if err := c.Bind(&p); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if p.Info == "" {
		p.Info = "{}"
	}

	err := s.db.Debug().WithContext(c.Request().Context()).Table("shop.products").Create(&p).Error
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	jsonBytes, err := json.Marshal(OKResponse{OK: true})
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSONBlob(http.StatusOK, jsonBytes)
}

func (s Service) getProductById(c echo.Context) error {
	productId := c.Param("productId")
	if productId == "" {
		return c.JSON(http.StatusBadRequest, "Bad product id")
	}

	var product models.Product
	err := s.db.Debug().WithContext(c.Request().Context()).Table("shop.products").Where("id", productId).First(&product).Error
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	jsonBytes, err := json.Marshal(product)
	if err != nil {
		log.Error(err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSONBlob(http.StatusOK, jsonBytes)
}
