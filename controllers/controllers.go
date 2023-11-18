package controllers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/ramnath.1998/DeepFleet/handlers"
	"github.com/ramnath.1998/DeepFleet/models"
)

func GetProducts(w http.ResponseWriter, r *http.Request) {
	productList := handlers.HandleGetProducts()
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(productList))
}

func GetCategories(w http.ResponseWriter, r *http.Request) {
	categoryList := handlers.HandleGetCategories()
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(categoryList))
}

func PostProducts(w http.ResponseWriter, r *http.Request) {

	content, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalf(err.Error())
	}
	product := models.Product{}
	json.Unmarshal(content, &product)
	product.Identifier = uuid.NewString()
	status := handlers.HandlePostProducts(&product)
	if !status {
		w.WriteHeader(http.StatusNotModified)
	}
	w.WriteHeader(http.StatusCreated)

}
func PostCategories(w http.ResponseWriter, r *http.Request) {

	content, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalf(err.Error())
	}
	category := models.Category{}
	json.Unmarshal(content, &category)
	category.Identifier = uuid.NewString()
	status := handlers.HandlePostCategories(&category)
	if !status {
		w.WriteHeader(http.StatusNotModified)
	}
	w.WriteHeader(http.StatusCreated)
}
func UpdateProducts(w http.ResponseWriter, r *http.Request) {

	content, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalf(err.Error())
	}
	product := models.Product{}
	json.Unmarshal(content, &product)

	status := handlers.HandleUpdateProducts(&product)
	if !status {
		w.WriteHeader(http.StatusNotModified)
		return
	}
	w.WriteHeader(http.StatusOK)

}

func UpdateCategories(w http.ResponseWriter, r *http.Request) {

	content, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalf(err.Error())
	}

	category := models.Category{}
	json.Unmarshal(content, &category)
	status := handlers.HandleUpdateCategories(&category)
	if !status {
		w.WriteHeader(http.StatusNotModified)
	}
	w.WriteHeader(http.StatusOK)

}

func DeleteProducts(w http.ResponseWriter, r *http.Request) {

	content, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalf(err.Error())
	}
	product := models.Product{}
	json.Unmarshal(content, &product)

	status := handlers.HandleDeleteProducts(&product)
	if !status {
		w.WriteHeader(http.StatusNotModified)
	}
	w.WriteHeader(http.StatusOK)

}

func DeleteCategories(w http.ResponseWriter, r *http.Request) {
	content, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalf(err.Error())
	}

	category := models.Category{}
	json.Unmarshal(content, &category)

	status := handlers.HandleDeleteCategories(&category)

	if !status {
		w.WriteHeader(http.StatusNotModified)
	}
	w.WriteHeader(http.StatusOK)
}

func GetBills(w http.ResponseWriter, r *http.Request) {
	bills := handlers.HandleGetBills()
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(bills))
}
func PostBills(w http.ResponseWriter, r *http.Request) {

	content, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalf(err.Error())
	}

	bill := models.Bill{}

	json.Unmarshal(content, &bill)

	bill.Identifier = uuid.NewString()
	status := handlers.HandlePostBill(&bill)

	if !status {
		w.WriteHeader(http.StatusNotModified)
	}
	w.WriteHeader(http.StatusCreated)

}
