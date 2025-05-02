import boto3
from datetime import datetime, timedelta

def fetch_aws_costs_last_7_days():
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


def fetch_aws_costs_by_service():
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


def fetch_aws_costs_by_region():
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
