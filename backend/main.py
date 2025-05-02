from fastapi import FastAPI
from aws_cost import fetch_aws_costs_by_service, fetch_aws_costs_last_7_days, fetch_aws_costs_by_region
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #TODO: Update this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/costs")
def get_costs():
    return {
        "status": "ok",
        "data": fetch_aws_costs_last_7_days()
    }

@app.get("/costs/by-service")
def get_costs_by_service():
    return {
        "status": "ok",
        "data": fetch_aws_costs_by_service()
    }

@app.get("/costs/by-region")
def get_costs_by_region():
    return {
        "status": "ok",
        "data": fetch_aws_costs_by_region()
    }