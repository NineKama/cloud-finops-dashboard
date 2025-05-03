# 🌤️ Cloud FinOps Dashboard

[![Trivy Backend Scan](https://github.com/NineKama/cloud-finops-dashboard/actions/workflows/trivy-backend.yml/badge.svg)](https://github.com/NineKama/cloud-finops-dashboard/actions/workflows/trivy-backend.yml)
[![Trivy Frontend Scan](https://github.com/NineKama/cloud-finops-dashboard/actions/workflows/trivy-frontend.yml/badge.svg)](https://github.com/NineKama/cloud-finops-dashboard/actions/workflows/trivy-frontend.yml)

A cloud-native FinOps dashboard to visualize AWS cost data by day, service, and region.
Built with **FastAPI**, **React (Vite)**, **Recharts**, and deployed via **Docker Compose**.

---

## 🚀 Features

* 📅 View AWS daily cost trends
* 🧩 Breakdown by AWS service
* 🌍 Analyze cost by AWS region
* ✅ Toggle individual services on/off
* 🐳 Fully containerized using Docker Compose
* 🔄 Designed to support **Azure** and **GCP** in the future
* 🪙 Redis caching for faster performance and reduced AWS API cost
---

## 📦 Tech Stack

| Layer    | Tech                    |
| -------- | ----------------------- |
| Frontend | React + Vite + Recharts |
| Backend  | FastAPI + Boto3 + Redis |
| Infra    | Docker Compose          |

---

## 🔧 Prerequisites

* [Docker](https://www.docker.com/) & Docker Compose installed
* AWS credentials with `ce:GetCostAndUsage` permissions

---

## 🛠️ Setup

### 1. Clone repo

```bash
git clone https://github.com/NineKama/cloud-finops-dashboard.git
cd cloud-finops-dashboard
```

### 2. Create `.env` file

```bash
cp .env.example .env
```

Then fill in your AWS credentials (please refer IAM Policy below):

```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=us-east-1
```

### 3. Build & Run

```bash
docker-compose up --build
```

### 4. Access Dashboard

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8000/docs](http://localhost:8000/docs)


## 🔐 Example IAM Policy (AWS Cost Explorer Only)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCostExplorerReadOnly",
      "Effect": "Allow",
      "Action": [
        "ce:GetCostAndUsage",
        "ce:GetCostForecast",
        "ce:GetDimensionValues",
        "ce:GetReservationUtilization",
        "ce:GetSavingsPlansUtilization"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## 🛡️ Security

* `.env` is gitignored
* Only least privilege IAM permissions required
* Docker images are scanned for vulnerabilities via GitHub Actions and Trivy

---

## 📈 Roadmap

* [x] AWS cost visualization
* [ ] Support Azure
* [ ] Support GCP
* [ ] User auth & login
* [ ] Save filters & preferences
* [ ] Export to CSV/PDF

---

## 🤝 Contributions

Feel free to fork & submit PRs. Feedback welcome!

