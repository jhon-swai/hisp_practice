import requests

g_url = '***'
def get_json_data():
    url = "***"
    response = requests.get(url)
    return response.json()