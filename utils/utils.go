package utils

import (
	"fmt"
	"reflect"
	"time"

	"github.com/ramnath.1998/DeepFleet/models"
)

func RemoveIndex(s []interface{}, index int) []interface{} {
	return append(s[:index], s[index+1:]...)
}

func ProductListInterfaceConverter(productList []models.Product) []interface{} {

	resultList := []interface{}{}

	for _, eachProduct := range productList {

		resultList = append(resultList, eachProduct)
	}

	return resultList
}

func InterFaceProductListConverter(productList []interface{}) []models.Product {

	resultList := make([]models.Product, 0, len(productList))

	for _, eachProduct := range productList {
		value := reflect.ValueOf(eachProduct)
		if value.Kind() == reflect.Struct && value.Type().Name() == "Product" {
			resultList = append(resultList, eachProduct.(models.Product))
		} else {
			fmt.Println("Item is not a Product struct:", eachProduct)
		}
	}

	return resultList

}

func CategoryListInterfaceConverter(categoryList []models.Category) []interface{} {

	resultList := []interface{}{}

	for _, eachCategory := range categoryList {
		resultList = append(resultList, eachCategory)
	}

	return resultList

}

func InterFaceCategoryListConverter(categoryList []interface{}) []models.Category {

	resultList := make([]models.Category, 0, len(categoryList))

	for _, eachCategory := range categoryList {
		value := reflect.ValueOf(eachCategory)
		if value.Kind() == reflect.Struct && value.Type().Name() == "Category" {
			resultList = append(resultList, eachCategory.(models.Category))
		} else {
			fmt.Println("Item is not a Product struct:", eachCategory)
		}
	}

	return resultList

}

func GetCurrentTimeAsString() string {
	currentTime := time.Now()
	return currentTime.Format("2006-01-02 15:04:05")
}
