import boto3
import redis
import json
from datetime import datetime, timedelta

r = redis.Redis(host="redis", port=6379, decode_responses=True)
CACHE_TTL = 3600 # 1 hour

def cache_or_fetch(key, fetch_func, ttl=CACHE_TTL, force_refresh=False):
    if not force_refresh:
        cached = r.get(key)
        if cached:
            print(f"✅ Cache hit: {key}")
            return json.loads(cached)

    print(f"🔁 Cache miss: {key} → Fetching from AWS")
    result = fetch_func()
    r.set(key, json.dumps(result), ex=ttl)
    return result

def fetch_aws_costs_last_7_days(force_refresh=False):
    def fetch():
        ce = boto3.client('ce')
        end = datetime.utcnow().date()
        start = end - timedelta(days=7)

        response = ce.get_cost_and_usage(
            TimePeriod={
                'Start': start.strftime('%Y-%m-%d'),
                'End': end.strftime('%Y-%m-%d')
            },
            Granularity='DAILY',
            Metrics=['UnblendedCost']
        )

        result = []
        for day in response['ResultsByTime']:
            result.append({
                "date": day['TimePeriod']['Start'],
                "cost": round(float(day['Total']['UnblendedCost']['Amount']), 2)
            })
        return result
    return cache_or_fetch("aws:cost:daily", fetch, force_refresh=force_refresh)


def fetch_aws_costs_by_service(force_refresh=False):
    def fetch():
        ce = boto3.client('ce')
        end = datetime.utcnow().date()
        start = end - timedelta(days=7)

        response = ce.get_cost_and_usage(
            TimePeriod={
                'Start': start.strftime('%Y-%m-%d'),
                'End': end.strftime('%Y-%m-%d')
            },
            Granularity='DAILY',
            Metrics=['UnblendedCost'],
            GroupBy=[
                {
                    'Type': 'DIMENSION',
                    'Key': 'SERVICE'
                }
            ]
        )

        result = []
        for day in response['ResultsByTime']:
            for group in day['Groups']:
                result.append({
                    "date": day['TimePeriod']['Start'],
                    "service": group['Keys'][0],
                    "cost": round(float(group['Metrics']['UnblendedCost']['Amount']), 2)
                })
        return result
    return cache_or_fetch("aws:cost:by_service", fetch, force_refresh=force_refresh)

def fetch_aws_costs_by_region(force_refresh=False):
    def fetch():
        ce = boto3.client('ce')
        end = datetime.utcnow().date()
        start = end - timedelta(days=7)

        response = ce.get_cost_and_usage(
            TimePeriod={
                'Start': start.strftime('%Y-%m-%d'),
                'End': end.strftime('%Y-%m-%d')
            },
            Granularity='DAILY',
            Metrics=['UnblendedCost'],
            GroupBy=[{
                'Type': 'DIMENSION',
                'Key': 'REGION'
            }]
        )

        result = []
        for day in response['ResultsByTime']:
            for group in day['Groups']:
                result.append({
                    "date": day['TimePeriod']['Start'],
                    "region": group['Keys'][0],
                    "cost": round(float(group['Metrics']['UnblendedCost']['Amount']), 4)
                })
        return result
    return cache_or_fetch("aws:cost:by_region", fetch, force_refresh=force_refresh)
