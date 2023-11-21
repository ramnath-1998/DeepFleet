package handlers

import (
	"encoding/json"
	"log"
	"slices"

	"github.com/google/uuid"
	"github.com/ramnath.1998/DeepFleet/models"
	"github.com/ramnath.1998/DeepFleet/utils"
)

var category1 = models.Category{Identifier: uuid.NewString(), CategoryName: "HouseHold Items", CategoryTax: 10}
var category2 = models.Category{Identifier: uuid.NewString(), CategoryName: "Electronics", CategoryTax: 20}

// var product1 = models.Product{ProductName: "Colgate", Price: 50, Category: category1, Unit: 1}
// var product2 = models.Product{ProductName: "Salt", Price: 50, Category: category1, Unit: 1}

// var product3 = models.Product{ProductName: "Laptop", Price: 50, Category: category2, Unit: 1}
// var product4 = models.Product{ProductName: "Mobile", Price: 50, Category: category2, Unit: 1}

var product1 = models.Product{Identifier: uuid.NewString(), ProductName: "Colgate", Rate: 50, Category: category1}
var product2 = models.Product{Identifier: uuid.NewString(), ProductName: "Salt", Rate: 50, Category: category1}

var product3 = models.Product{Identifier: uuid.NewString(), ProductName: "Laptop", Rate: 50, Category: category2}
var product4 = models.Product{Identifier: uuid.NewString(), ProductName: "Mobile", Rate: 50, Category: category2}

var bill1 = models.Bill{PersonName: "Ramnath", ProductList: []models.Product{product1, product2}, BillCreatedOn: utils.GetCurrentTimeAsString(), TotalTaxAmount: 101, TotalPriceAmount: 620, TotalPrice: 1510}

var bill2 = models.Bill{PersonName: "Ajay", ProductList: []models.Product{product3, product4}, BillCreatedOn: "2006-01-02 15:04:05", TotalTaxAmount: 10, TotalPriceAmount: 60, TotalPrice: 500}

var CategoryList = []models.Category{category1, category2}
var ProductList = []models.Product{product1, product2, product3, product4}
var TotalBillList = []models.Bill{bill1, bill2}

func HandleGetProducts() string {
	CalculateTaxForAllProductsInProductsList()
	json, err := json.Marshal(ProductList)
	if err != nil {
		log.Fatalf(err.Error())
	}
	return string(json)
}

func HandleGetCategories() string {
	json, err := json.Marshal(CategoryList)
	if err != nil {
		log.Fatalf(err.Error())
	}
	return string(json)
}

func HandlePostProducts(product *models.Product) bool {

	status := false
	if !slices.Contains(ProductList, *product) {
		ProductList = append(ProductList, *product)
		status = true
	}

	return status

}

func HandlePostCategories(category *models.Category) bool {

	status := false
	if !slices.Contains(CategoryList, *category) {
		CategoryList = append(CategoryList, *category)
		status = true
	}

	return status
}

func HandleUpdateProducts(product *models.Product) bool {

	status := false
	for i, eachProduct := range ProductList {

		if eachProduct.Identifier == product.Identifier && slices.Contains(CategoryList, product.Category) {
			ProductList[i] = *product
			status = true
		}
	}

	return status
}

func HandleUpdateCategories(category *models.Category) bool {
	status := false
	for i, eachCategory := range CategoryList {
		if eachCategory.Identifier == category.Identifier {
			CategoryList[i] = *category
			status = true

		}
	}
	return status
}

func HandleDeleteProducts(product *models.Product) bool {

	status := false

	for _, eachProduct := range ProductList {
		if eachProduct.Identifier == product.Identifier {
			ProductListConverted := utils.ProductListInterfaceConverter(ProductList)
			ProductListConverted = utils.RemoveIndex(ProductListConverted, slices.Index(ProductList, eachProduct))
			ProductList = utils.InterFaceProductListConverter(ProductListConverted)
			status = true
		}
	}

	return status

}

func HandleDeleteCategories(category *models.Category) bool {

	status := false

	for _, eachCategory := range CategoryList {

		if eachCategory.Identifier == category.Identifier {
			CategoryListConverted := utils.CategoryListInterfaceConverter(CategoryList)
			CategoryListConverted = utils.RemoveIndex(CategoryListConverted, slices.Index(CategoryList, eachCategory))
			CategoryList = utils.InterFaceCategoryListConverter(CategoryListConverted)
			status = true
		}

	}

	return status

}

func HandleGetBills() string {
	json, err := json.Marshal(TotalBillList)

	if err != nil {
		log.Fatalf(err.Error())
	}
	return string(json)
}

func HandlePostBill(bill *models.Bill) bool {

	status := false

	for _, eachBill := range TotalBillList {
		if eachBill.Identifier == bill.Identifier && AllProductsInProductsList(bill) {
			return status
		}
	}

	bill.BillCreatedOn = utils.GetCurrentTimeAsString()
	TotalBillList = append(TotalBillList, *bill)
	status = true

	return status

}

func AllProductsInProductsList(bill *models.Bill) bool {
	billProducts := bill.ProductList
	for _, eachBillProduct := range billProducts {
		if !slices.Contains(ProductList, eachBillProduct) {
			return false
		}

	}
	return true

}

func CalculateTaxForAllProductsInProductsList() {
	for i, eachProduct := range ProductList {
		category := eachProduct.Category
		eachProduct.Tax = eachProduct.Rate * category.CategoryTax / 100
		eachProduct.Price = eachProduct.Rate + eachProduct.Rate*category.CategoryTax/100
		ProductList[i] = eachProduct
	}

}
