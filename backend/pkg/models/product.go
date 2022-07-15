package models

import "github.com/lib/pq"

type Category string

const (
	Tshirt   Category = "tshirt"
	Trousers Category = "trousers"
)

type Product struct {
	Id           int             `json:"id,omitempty" gorm:"primaryKey;column:id" from:"id"`
	Name         string          `json:"name,omitempty" gorm:"column:name" from:"name"`
	Price        float64         `json:"price,omitempty" gorm:"column:price" from:"price"`
	Quantity     int             `json:"quantity,omitempty" gorm:"column:quantity" from:"quantity"`
	Category     Category        `json:"category,omitempty" gorm:"column:category" from:"category"`
	Tags         *pq.StringArray `json:"tags,omitempty" gorm:"column:tags;type:text[]" from:"tags"`
	MainPhotoUrl string          `json:"mainPhotoUrl,omitempty" gorm:"column:mainPhotoURL" from:"mainPhotoUrl"`
	PhotosUrl    *pq.StringArray `json:"photosUrl,omitempty" gorm:"column:photosURL;type:text[]" from:"photosUrl"`
}

type NewProductForm struct {
	Name         string   `json:"name,omitempty" gorm:"column:name" from:"name"`
	Price        float64  `json:"price,omitempty" gorm:"column:price" from:"price"`
	Quantity     int      `json:"quantity,omitempty" gorm:"column:quantity" from:"quantity"`
	Category     Category `json:"category,omitempty" gorm:"column:category" from:"category"`
	MainPhotoUrl string   `json:"mainPhotoUrl,omitempty" gorm:"column:mainPhotoUrl" from:"mainPhotoUrl"`
}
