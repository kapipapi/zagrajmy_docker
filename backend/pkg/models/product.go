package models

type Product struct {
	Id       int    `json:"id,omitempty" gorm:"primaryKey;column:id" from:"id"`
	Name     string `json:"name,omitempty" gorm:"column:name" from:"name"`
	Quantity int    `json:"quantity,omitempty" gorm:"column:quantity" from:"quantity"`
	PhotoUrl string `json:"photoUrl,omitempty" gorm:"column:photoUrl" from:"photoUrl"`
	Info     string `json:"info,omitempty" gorm:"column:info" from:"info"`
	Price    int    `json:"price,omitempty" gorm:"column:price" from:"price"`
}
