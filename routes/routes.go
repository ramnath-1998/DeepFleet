package routes

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/ramnath.1998/DeepFleet/controllers"
)

var (
	Products   = "/products"
	Categories = "/categories"
	Bills      = "/bills"
)

func RunBackendRoutes() {
	r := mux.NewRouter()

	apiRouter := r.PathPrefix("/api").Subrouter()
	apiRouter.HandleFunc(Products, controllers.GetProducts).Methods("GET")
	apiRouter.HandleFunc(Products, controllers.PostProducts).Methods("POST")
	apiRouter.HandleFunc(Products, controllers.UpdateProducts).Methods("PUT")
	apiRouter.HandleFunc(Products, controllers.DeleteProducts).Methods("DELETE")
	apiRouter.HandleFunc(Categories, controllers.GetCategories).Methods("GET")
	apiRouter.HandleFunc(Categories, controllers.PostCategories).Methods("POST")
	apiRouter.HandleFunc(Categories, controllers.UpdateCategories).Methods("PUT")
	apiRouter.HandleFunc(Categories, controllers.DeleteCategories).Methods("DELETE")
	apiRouter.HandleFunc(Bills, controllers.GetBills).Methods("GET")
	apiRouter.HandleFunc(Bills, controllers.PostBills).Methods("POST")
	fmt.Println("Server Running on port 8080")
	http.ListenAndServe(":8080", r)

}
