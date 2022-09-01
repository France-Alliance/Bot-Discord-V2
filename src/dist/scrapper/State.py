from datetime import datetime
from dotenv import dotenv_values
import progressbar

SYSTEM_ENV = dotenv_values()
print(SYSTEM_ENV)

date = datetime.now().strftime("%d-%m-%Y")

URL = 'https://www.airlines-manager.com/'
URL_ALLIANCE_PROFIL = 'https://www.airlines-manager.com/alliance'
URL_MEMBERS_PROFIL = 'https://www.airlines-manager.com/company/profile'

ALLIANCE_TABS = ["profile", "members", "network"]
ALLIANCE_LIST = [{"Name": "Aquila", "ID": 74365}, {
    "Name": "Pyxis", "ID": 88492}, {"Name": "Cygnus", "ID": 92914}, {"Name": "Lyrae", "ID": 93220}, {"Name": "Gemini", "ID": 153431}]

email = SYSTEM_ENV["EMAIL_ACCOUNT_1"]
password = SYSTEM_ENV["PWD_ACCOUNT_1"]


starType = ["no", "bronze", "silver", "gold"]

resultJson = {'alliance': []}
typeAllianceResult = {
    "Name": None, "ID": None, "Classement": None,
    "Profile": {
        "General": {"Created": None, "nbCompanies": None, "Solde": None, "BeneficeHebdo": None, "TaxeHebdo": None},
        "Hub": {"HubsDispo": None, "KmPartage": None, "TaxeLigne": None, "TaxeCompanies": None},
        "AG": {"nbAvionProposer": None, "ReducMax": None, "Reduc30j": None, "nbAvionAcheter": None, "AideAchatMax": None, "AideAchat30j": None},
        "R&D": None
    },
    "Members": [
        # PatternMembers Here
    ],
    "Networks": {
        "Statistique": {
            "NbrHub": None,
            "NbrLigne": None,
            "KmLigne": None,
        },
        "Hubs": [

        ]
    }
}

patternHubs = {"IATA": None, "DemandPartage": None, "NbLigne": None,
               "KmLigne": None, "NbKmAutoriser": None, "KmRestant": None, "Benefices": None}

patternMembers = {"ID": None, "Name": None, "Star": {"Nombre": None, "Type": None},
                  "Owner": None, "Hubs": [], "Role": None, "Valorisation": None, "Solde": None, "LastConnection": "Hard Work in Here !!! (Soon)"}


def getWidget(name):
    return [
        name, ' -',
        ' [', progressbar.Timer(), '] ',
        progressbar.Bar(),
        ' (', progressbar.ETA(), ') ',
    ]
