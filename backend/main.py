from fastapi import FastAPI, Query
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
def get_costs(force: bool = Query(False, description="Force refresh the data")):
    return {
        "status": "ok",
        "data": fetch_aws_costs_last_7_days(force_refresh=force)
    }

@app.get("/costs/by-service")
def get_costs_by_service(force: bool = Query(False, description="Force refresh the data")):
    return {
        "status": "ok",
        "data": fetch_aws_costs_by_service(force_refresh=force)
    }

@app.get("/costs/by-region")
def get_costs_by_region(force: bool = Query(False, description="Force refresh the data")):
    return {
        "status": "ok",
        "data": fetch_aws_costs_by_region(force_refresh=force)
    }

@app.get("/costs/summary")
def get_costs_summary(force: bool = Query(False, description="Force refresh the data")):
    return {
        "status": "ok",
        "data": {
            "by_region": fetch_aws_costs_by_region(force_refresh=force),
            "by_service": fetch_aws_costs_by_service(force_refresh=force),
            "daily": fetch_aws_costs_last_7_days(force_refresh=force),
        }
    }