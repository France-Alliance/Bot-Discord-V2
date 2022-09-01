
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

from State import email, password

def connect(driver):
  driver.find_element(By.ID, "username").send_keys(email)
  driver.find_element(By.ID, "password").send_keys(password)
  driver.find_element(By.ID, "loginSubmit").click()