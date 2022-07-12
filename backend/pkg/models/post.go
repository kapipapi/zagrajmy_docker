package models

type Post struct {
	Id     int    `gorm:"primaryKey;column:id" json:"id,omitempty" `
	UserId int    `gorm:"column:userId" json:"user_id,omitempty"`
	Title  string `gorm:"column:title" json:"title,omitempty"`
	Body   string `gorm:"column:body" json:"body,omitempty"`
}
