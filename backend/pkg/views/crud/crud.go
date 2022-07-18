package crud

import (
	"encoding/json"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"gorm.io/gorm"
	"net/http"
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

	e.GET("/api/:tableName/get", s.getProducts)
}

func (s Service) getProducts(c echo.Context) error {
	tableName := c.Param("tableName")

	var dto []interface{}
	err := s.db.
		Debug().
		WithContext(c.Request().Context()).
		Table(tableName).
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

//func (s Service) getProductById(c echo.Context) error {
//	productId := c.Param("productId")
//	if productId == "" {
//		return c.JSON(http.StatusBadRequest, "Bad product id")
//	}
//
//	var product models.Product
//	err := s.db.Debug().WithContext(c.Request().Context()).Table("shop.products").Where("id", productId).First(&product).Error
//	if err != nil {
//		log.Error(err)
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	jsonBytes, err := json.Marshal(product)
//	if err != nil {
//		log.Error(err)
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	return c.JSONBlob(http.StatusOK, jsonBytes)
//}
//
//type OKResponse struct {
//	OK bool `json:"ok"`
//}
//
//func (s Service) newProduct(c echo.Context) error {
//	name := c.FormValue("name")
//	price := c.FormValue("price")
//	quantity := c.FormValue("quantity")
//	category := c.FormValue("category")
//
//	file, err := c.FormFile("file")
//	if err != nil {
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//	src, err := file.Open()
//	if err != nil {
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//	defer src.Close()
//
//	filePath := fmt.Sprintf("images/%s/%s", category, file.Filename)
//
//	// Destination
//	dst, err := os.Create(filePath)
//	if err != nil {
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//	defer dst.Close()
//
//	// Copy
//	if _, err = io.Copy(dst, src); err != nil {
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	priceParsed, err := strconv.ParseFloat(price, 64)
//	if err != nil {
//		log.Error(err)
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	quantityParsed, err := strconv.Atoi(quantity)
//	if err != nil {
//		log.Error(err)
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	p := models.Product{
//		Name:         name,
//		Price:        priceParsed,
//		Quantity:     quantityParsed,
//		Category:     models.Category(category),
//		MainPhotoUrl: fmt.Sprintf("http://%s/%s", c.Request().Host, filePath),
//	}
//
//	err = s.db.Debug().WithContext(c.Request().Context()).Table("shop.products").Create(&p).Error
//	if err != nil {
//		log.Error(err)
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	jsonBytes, err := json.Marshal(p)
//	if err != nil {
//		log.Error(err)
//		return c.JSON(http.StatusInternalServerError, err.Error())
//	}
//
//	return c.JSONBlob(http.StatusOK, jsonBytes)
//}
