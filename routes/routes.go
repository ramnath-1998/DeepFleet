package routes

import (
	"fmt"
	"net/http"
	"os"
	"os/exec"

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
	apiRouter.Use(CorsMiddleware)
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

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // You might want to specify your allowed origins instead of "*"
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func RunClientApp() {

	viteProjectDir := "./ClientApp"
	err := os.Chdir(viteProjectDir)
	if err != nil {
		fmt.Println("Error changing directory:", err)
		return
	}

	cmd := exec.Command("npm", "run", "dev")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err = cmd.Run()
	if err != nil {
		fmt.Println("Error starting Vite server:", err)
		return
	}

	err = cmd.Wait()
	if err != nil {
		fmt.Println("Command finished with error:", err)
	}

	fmt.Println("Frontend server started")
}
