from tracemalloc import start
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.core.utils import ChromeType

from time import monotonic_ns as mtc
from os.path import exists
from json import dumps, load

from State import URL, date, ALLIANCE_TABS, ALLIANCE_LIST, URL_ALLIANCE_PROFIL, typeAllianceResult, resultJson
from Static import static
from Utils import connect

option = Options()
option.add_argument("--no-sandbox")
option.add_argument("--headless")
option.add_argument("--disable-gpu")
option.add_argument("--log-level=1")
option.add_experimental_option('excludeSwitches', ['enable-logging'])


def run():
    if not exists(f".\\src\\dist\\scrapper\\out\\{date}.json"):
        pathExe = ChromeDriverManager(path=r".\\src\\dist\\scrapper\\Drivers").install()
        with webdriver.Chrome(service=ChromeService(pathExe), options=option) as driver:
            driver.get(URL)
            connect(driver)
            driver.get(URL+'home')
            

            result = (resultJson.copy())["alliance"]
            for alliance in ALLIANCE_LIST:
                res = typeAllianceResult.copy()
                for tabs in ALLIANCE_TABS:
                    driver.get(f"{URL_ALLIANCE_PROFIL}/{tabs}/{alliance['ID']}")
                    res = static(driver, res, tabs)
                result.append(res)
            # print(result)
        f = open(f".\\src\\dist\\scrapper\\out\\{date}.json", "w", encoding='utf8')
        f.write(dumps(result, indent=4))


if __name__ == "__main__":
    start=mtc()
    run()
    end=mtc()
    print(f"{end-start} ns")
