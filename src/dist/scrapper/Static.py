from selenium.webdriver.common.by import By
from flatten_dict import flatten, unflatten
from selenium.webdriver.support.wait import WebDriverWait

from State import patternHubs, patternMembers


def static(driver, result, tabs):
    Elements = {
        "profile": [
            {
                "variable": ('Name',),
                "xpath": '//*[@id="alliance_profile"]/div[1]/div[2]/ul/li[1]/b',
                "callback": lambda x: x.text
            },
            {
                "variable": ('ID',),
                "xpath": '//*[@id="alliance_profile"]/div[2]/div[1]/a',
                "callback": lambda x: int(x.get_attribute('href').split("/")[-1])
            },
            {
                "variable": ('Classement',),
                "xpath": '//*[@id="alliance_profile"]/div[1]/div[3]/ul/li[4]',
                "callback": lambda x: int(x.text.replace(" ", ""))
            },
            {
                "variable": ('Profile', "General", "Created"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[1]/td[1]/div/span[2]/span',
                "callback": lambda x: x.text
            },
            {
                "variable": ('Profile', "General", "nbCompanies"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[2]/td[1]/div/span[2]/span',
                "callback": lambda x: int(x.text)
            },
            {
                "variable": ('Profile', "General", "Solde"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[2]/td[2]/div/span[2]/span',
                "callback": lambda x: int(x.text.replace(" ", "").replace("$", ""))
            },
            {
                "variable": ('Profile', "General", "BeneficeHebdo"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[3]/td[1]/div/span[2]/span',
                "callback": lambda x: int(x.text.replace(" ", "").replace("$", ""))
            },
            {
                "variable": ('Profile', "General", "TaxeHebdo"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[1]/td[2]/div/span[2]/span',
                "callback": lambda x: float(x.text.split(" ")[0].replace("%", "").replace(",", "."))
            },
            {
                "variable": ('Profile', "Hub", "HubsDispo"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[1]/td[1]/div/span[2]/span',
                "callback": lambda x: int(x.text)
            },
            {
                "variable": ('Profile', "Hub", "KmPartage"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[2]/td[1]/div/span[2]',
                "callback": lambda x: int(x.text.replace(" ", "").replace("km", "").replace(",", ""))
            },
            {
                "variable": ('Profile', "Hub", "TaxeLigne"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[1]/td[2]/div/span[2]',
                "callback": lambda x: float(x.text.split(" ")[0].replace("%", "").replace(",", "."))
            },
            {
                "variable": ('Profile', "Hub", "TaxeCompagnies"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[2]/td[2]/div/span[2]/span',
                "callback": lambda x: float(x.text.split(" ")[0].replace("%", "").replace(",", "."))
            },
            {
                "variable": ('Profile', "AG", "nbAvionProposer"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[1]/td[1]/div/span[2]/span',
                "callback": lambda x: x.text
            },
            {
                "variable": ('Profile', "AG", "ReducMax"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[2]/td[1]/div/span[2]/span',
                "callback": lambda x: float(x.text.replace(" %", "").replace(",", "."))
            },
            {
                "variable": ('Profile', "AG", "Reduc30j"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[3]/td[1]/div/span[2]/span',
                "callback": lambda x: int(x.text.replace(" ", "").replace("$", ""))
            },
            {
                "variable": ('Profile', "AG", "nbAvionAchter"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[1]/td[2]/div/span[2]',
                "callback": lambda x: int(x.text)
            },
            {
                "variable": ('Profile', "AG", "AideAchatMax"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[2]/td[2]/div/span[2]/span',
                "callback": lambda x: float(x.text.replace(" %", "").replace(",", "."))
            },
            {
                "variable": ('Profile', "AG", "AideAchat30j"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[3]/td[2]/div/span[2]/span',
                "callback": lambda x: x.text
            },
            {
                "variable": ('Profile', "R&D"),
                "xpath": '//*[@id="alliance_profile_statistiques_general_research"]/tbody/tr/td[1]/div/div/div',
                "callback": lambda x: int(x.get_attribute('title').replace("%", ""))
            },
        ],
        "members": [
            {
                "variable": ('Star', 'Nombre'),
                "xpath": '',
                "callback": lambda x: x,
                "other": True
            },
            {
                "variable": ('Star', 'Type'),
                "xpath": lambda j, i: f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[2]/span[{j}]',
                "callback": lambda x: x.get_attribute('class').split(" ")[2].replace("StarSmall", ""),
                "other": True
            },
            {
                "variable": ('ID',),
                "xpath": lambda i: f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[6]/a',
                "callback": lambda x: int(x.get_attribute('href').split("/")[-1]),
                "other": True
            },
            {
                "variable": ('Name',),
                "xpath": lambda i: f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[1]',
                "callback": lambda x: x.text.replace(" ", "_"),
                "other": True
            },
            {
                "variable": ('Owner',),
                "xpath": lambda i: f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[3]',
                "callback": lambda x: x.text.replace(" ", "_"),
                "other": True
            },
            {
                "variable": ('Hubs',),
                "xpath": lambda i: f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[4]',
                "callback": lambda x: x.text.replace(" ", "").replace("\n", "").split("/"),
                "other": True
            },
            {
                "variable": ('Role',),
                "xpath": lambda i: f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[5]/ul',
                "callback": lambda x: x.text.replace(" ", "").replace("\n", "", 1).replace("\n", ", ", 1).replace("\n", "", 1),
                "other": True
            },
            {
                "variable": ('Valorisation',),
                "xpath": '//*[@id="company_profile"]/div[2]/div[3]/div[1]/div[2]/span[2]',
                "callback": lambda x: int(x.text.replace(" ", "").replace("$", "").replace(",", "")),
                "other": True
            },
            {
                "variable": ('Solde',),
                "xpath": '//*[@id="company_profile"]/div[2]/div[3]/div[2]/div[2]/span[2]',
                "callback": lambda x: int(x.text.replace(" ", "").replace("$", "").replace(",", "")),
                "other": True
            },
            {
                "variable": ('LastConnection',),
                "xpath": '//*[@id="company_profile"]/div[2]/div[3]/div[2]/div[1]/span[2]',
                "callback": lambda x: x.text.replace(" ", "").replace("$", ""),
                "other": True
            },
        ],
        "network": [
            {
                "variable": ('Networks', "Statistique", "NbrHub"),
                "xpath": '//*[@id="alliance_profile"]/div[4]/div[1]/div[1]/span[2]/span',
                "callback": lambda x: int(x.text)
            },
            {
                "variable": ('Networks', "Statistique", "NbrLigne"),
                "xpath": '//*[@id="alliance_profile"]/div[4]/div[1]/div[2]/span[2]/span',
                "callback": lambda x: int(x.text)
            },
            {
                "variable": ('Networks', "Statistique", "KmLigne"),
                "xpath": '//*[@id="alliance_profile"]/div[4]/div[1]/div[3]/span[2]/span',
                "callback": lambda x: int(x.text.replace(" ", "").replace("km", ""))
            },
            {
                "variable": ('IATA',),
                "xpath": lambda i: f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[1]',
                "callback": lambda x: x.text.replace("/", "").replace(" ", "").replace("\n", ""),
                "other": True
            },
            {
                "variable": ('DemandPartage',),
                "xpath": lambda i: f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[2]',
                "callback": lambda x: float(x.text.replace(" ", "").replace("%", "").replace(",", ".")),
                "other": True
            },
            {
                "variable": ('KmLigne',),
                "xpath": lambda i: f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[3]/div[2]',
                "callback": lambda x: int(x.text.replace(" ", "").replace("\n", "").replace("km", "")),
                "other": True
            },
            {
                "variable": ('NbLigne',),
                "xpath": lambda i: f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[3]/div[1]',
                "callback": lambda x: int(x.text.replace(" ", "").replace("\n", "")),
                "other": True
            },
            {
                "variable": ('NbKmAutoriser',),
                "xpath": lambda i: f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[4]',
                "callback": lambda x: int(x.text.replace(" ", "").replace("km", "")),
                "other": True
            },
            {
                "variable": ('KmRestant',),
                "xpath": lambda i: f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[5]',
                "callback": lambda x: float(x.text.replace(" ", "").replace("%", "").replace(",", ".")),
                "other": True
            },
            {
                "variable": ('Benefices',),
                "xpath": lambda i: f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[6]',
                "callback": lambda x: int(x.text.replace(" ", "").replace("$", "")),
                "other": True
            },
        ]
    }

    resultFlatten = flatten(result)
    if tabs == "profile":
        for element in Elements[tabs]:
            resultFlatten[element.get('variable')] = element['callback'](
                driver.find_element(By.XPATH, element['xpath']))
    elif tabs == "members":
        for i in range(2, len(driver.find_elements(By.CSS_SELECTOR, '#allianceMembersList > tbody > tr')) + 1):
          pmc = flatten(patternMembers.copy())

          for j in range(1, 6):
              typeStar = Elements["members"][1]['callback'](
                  driver.find_element(By.XPATH, Elements.get("members")[1].get('xpath')(j, i)))
              if pmc.get(('Star', 'Type')) == None:
                  pmc[Elements["members"][0].get('variable')] = j
                  pmc[Elements["members"][1].get('variable')] = typeStar
              elif typeStar == pmc[Elements["members"][1].get('variable')]:
                  pmc[Elements["members"][0].get('variable')] = j
              else:
                  break

          for element in Elements[tabs][2:7]:
              pmc[element.get('variable')] = element['callback'](
                  driver.find_element(By.XPATH, element.get('xpath')(i)))

          driver.execute_script(
              f'document.querySelector("#allianceMembersList > tbody > tr:nth-child({i}) > td:nth-child(6) > a").click();')
          if WebDriverWait(driver, timeout=10).until(lambda d: d.find_element(By.XPATH, '//*[@id="company_profile"]/div[2]/div[3]/div[1]/div[2]/span[2]')):
              for element in Elements[tabs][7:]:
                  pmc[element.get('variable')] = element['callback'](
                      driver.find_element(By.XPATH, element.get('xpath')))
          driver.back()
          if WebDriverWait(driver, timeout=10).until(lambda d: d.find_element(By.XPATH, '//*[@id="allianceMembersList"]/tbody/tr[1]/th[2]/span')):
              del pmc.get(('Hubs',))[-1]
              resultFlatten.get(('Members',)).append(unflatten(pmc))
    elif tabs == "network":
        for element in Elements[tabs][:3]:
            resultFlatten[element.get('variable')] = element['callback'](
                driver.find_element(By.XPATH, element.get('xpath')))

        for i in range(2, len(driver.find_elements(By.CSS_SELECTOR, '#alliance_profile > table > tbody > tr'))):
            phc = flatten(patternHubs.copy())

            if int(driver.find_element(By.XPATH, f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[3]/div[2]').text.replace(" ", "").replace("\n", "").replace("km", "")) != 0:
                for element in Elements[tabs][3:]:
                    phc[element.get('variable')] = element['callback'](
                        driver.find_element(By.XPATH, element.get('xpath')(i)))

            if (unflatten(phc) != patternHubs.copy()):
                resultFlatten[('Networks', 'Hubs')].append(unflatten(phc))

    return unflatten(resultFlatten)
