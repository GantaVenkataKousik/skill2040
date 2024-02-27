import requests
from bs4 import BeautifulSoup
import pandas as pd
import time


# URL of the website to scrape
url = "https://www.javatpoint.com/java-tutorial"

# Send an HTTP GET request to the website
response = requests.get(url)

# Parse the HTML code using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')


