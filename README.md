# CloudComputing Project – Kubernetes & Docker  

## Project description
This project is a containerized application orchestrated with **Docker** and **Kubernetes**. It contains various microservices that communicate with each other to provide a complete application.

## Installation & Start

### 1. With **Docker**
If you want to work with Docker:

1. **Clone project**
2. **Install Docker Desktop**
3. **Build and start Container**
   - docker-compose up --build 
4. The application can then be accessed at http://localhost:3000/

### 2. With **Kubernetes**
If you want to work with Kubernetes:

1. **Clone project**
2. **Install minikube & kubectl**
3. **Build and start**
   - minikube start
   - kubectl apply -f .
   - kubectl get pods (Get all Pods with name etc.)
   - kubectl port-forward cloudcomputing-hs-frontend-<Pod-Name-Ending> 3000:3000
4. The application can then be accessed at http://localhost:3000/
