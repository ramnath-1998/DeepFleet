package models

type Category struct {
	Identifier   string  `json:"categoryIdentifier"`
	CategoryName string  `json:"categoryName"`
	CategoryTax  float64 `json:"categoryTax"`
}

type Product struct {
	Identifier  string  `json:"productIdentifier"`
	ProductName string  `json:"productName"`
	Price       float64 `json:"price"`
	Rate        float64 `json:"rate"`
	Tax         float64 `json:"tax"`
	Unit        float64 `json:"unit,omitempty"`
	Category
}

type Bill struct {
	PersonName       string    `json:"personName"`
	Identifier       string    `json:"billIdentifier"`
	ProductList      []Product `json:"productList"`
	BillCreatedOn    string    `json:"billCreatedOn"`
	TotalTaxAmount   float64   `json:"taxAmount"`
	TotalPriceAmount float64   `json:"priceAmount"`
	TotalPrice       float64   `json:"totalPrice"`
}
