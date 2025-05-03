# 📦 Changelog

All notable changes to this project will be documented in this file.

---
## v1.1.0 - Add Redis Caching · 2025-05-04

### ✨ Features
- 🚀 Added Redis caching for all AWS Cost Explorer API calls (daily, by service, by region)
- 🧠 Generic `cache_or_fetch()` function to simplify cache logic
- 🧱 Introduced Redis container to `docker-compose.yml`
- ⚡ Significantly improved dashboard speed and reduced AWS API cost

### 🛠 Infra
- Redis added as a service in Docker Compose stack

--- 
## v1.0.1 - Add Trivy CI Scan · 2025-05-03

### 🔐 CI Security
- ✅ Trivy scan added for backend & frontend Docker images
- 🔍 CI fails if CRITICAL or HIGH vulnerabilities are found
- 🧱 Workflow split into `trivy-backend.yml` and `trivy-frontend.yml`
- 🏷️ Badges added to README for scan status

---

## v1.0.0 - Initial Release · 2025-05-03

### ✨ Features

* 📅 View AWS daily cost trends
* 🧩 Breakdown cost by AWS service
* 🌍 Analyze cost by AWS region
* ✅ Toggle individual services on/off
* 🐳 Docker Compose support for local deployment

### ⚙️ Tech Stack

* Backend: FastAPI + Boto3
* Frontend: React + Vite + Recharts
* Infra: Docker Compose

### 🔐 IAM Requirements

* `ce:GetCostAndUsage`

---

## Upcoming

* Support for Azure and GCP
* User authentication & multi-tenant view
* Export to CSV/PDF
* Dark mode UI
* Saved filters & advanced cost filters
