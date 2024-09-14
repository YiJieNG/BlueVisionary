from flask import Flask, jsonify, request
from flask_cors import CORS 
import MySQLdb
import os
from dotenv import load_dotenv
import numpy as np
import re

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration for MySQL connection
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')
MYSQL_PORT = int(os.getenv('MYSQL_PORT'))

# Function to get a database connection
def get_db_connection():
    try:
        return MySQLdb.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            passwd=MYSQL_PASSWORD,
            db=MYSQL_DB,
            port=MYSQL_PORT
        )
    except Exception as error:
        # handle the exception
        print("An exception occurred:", error)


# Testing connection on start-up
connection = get_db_connection()
if connection is None:
    print("Connection failed")
else:
    print("Connection successful")
    connection.close()

#need to make a change
@app.route('/api/questions', methods=['GET'])
def get_questions():
    db = get_db_connection()
    cur = db.cursor()
    query = '''SELECT q_id, question, option_1, option_2, option_3, option_4, correct_answer, 
                count_option_1, count_option_2, count_option_3, count_option_4, explanation 
                FROM questionnaire
            '''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    db.close()

    questions = []
    for row in data:
        questions.append({
            "questionId": row[0],
            "questionText": row[1],
            "option1": row[2],
            "option2": row[3],
            "option3": row[4],
            "option4": row[5],
            "correctOption": row[6],
            "option1Count": row[7],
            "option2Count": row[8],
            "option3Count": row[9],
            "option4Count": row[10],
            "explanation": row[11]
        })

    return jsonify(questions)

@app.route('/api/update_option_count', methods=['POST'])
def update_option_count():
    data = request.get_json()
    question_id = data.get('questionId')  
    option_index = data.get('optionIndex')

    db = get_db_connection()
    cur = db.cursor()

    if option_index == 0:
        cur.execute("UPDATE questionnaire SET count_option_1 = count_option_1 + 1 WHERE q_id = %s", (question_id,))
    elif option_index == 1:
        cur.execute("UPDATE questionnaire SET count_option_2 = count_option_2 + 1 WHERE q_id = %s", (question_id,))
    elif option_index == 2:
        cur.execute("UPDATE questionnaire SET count_option_3 = count_option_3 + 1 WHERE q_id = %s", (question_id,))
    elif option_index == 3:
        cur.execute("UPDATE questionnaire SET count_option_4 = count_option_4 + 1 WHERE q_id = %s", (question_id,))

    db.commit()
    cur.close()
    db.close()

    return jsonify({"message": "Option count updated"}), 200

@app.route('/api/get_state_stat', methods=['GET'])
def get_state_stat():
    """
    get number of species that is critically endangered, endangered and vulnerable in the provided state.
    """
    db = get_db_connection()
    cur = db.cursor()
    query = '''SELECT State, Critically_Endangered, Endangered, Vulnerable 
                FROM threat_state_count
            '''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    db.close()
    stats = {}
    for item in data:
        stats[item[0]]={
            "critically_endangered": item[1],
            "endangered": item[2],
            "vulnerable": item[3]
        }
    return jsonify(stats)

@app.route('/api/get_state_species/<state>/<status>', methods=['GET'])
def get_state_species(state, status):
    """
    get number of species that is under the status provided in the provided state.
    For example: number of fishes, mammels, reptiles that is endangered in Victoria.
    """
    db = get_db_connection()
    cur = db.cursor()
    # cur.execute('''SELECT TAXON_GROUP, count(*) FROM threat_species
    #             WHERE {0}=1
    #             AND LOWER(THREATENED_STATUS) = LOWER("{1}")
    #             GROUP BY TAXON_GROUP
    #             '''.format(state, status))
    query = '''SELECT TAXON_GROUP, count(*) 
                FROM threat_species
                WHERE {}=1
                AND LOWER(THREATENED_STATUS) = LOWER(%s)
                GROUP BY TAXON_GROUP
            '''.format(state)
    cur.execute(query, (status,))
    data = cur.fetchall()
    cur.close()
    db.close()
    stats = {}
    for item in data:
        stats[item[0]] = item[1]
    
    return jsonify(stats)

@app.route('/api/get_description/<state>/<status>/<species>', methods=['GET'])
def get_description(state, status, species):
    """
    get the descriptions of a specific kind of species given the status and state information.
    For example: get the descriptions of fishes that is endangered in Victoria.
    """
    db = get_db_connection()
    cur = db.cursor()
    # cur.execute('''SELECT SCIENTIFIC_NAME, VERNACULAR_NAME, habitat, threats  
    #                 FROM threat_species
    #                 WHERE {0}=1
    #                 AND LOWER(THREATENED_STATUS) = LOWER("{1}")
    #                 AND TAXON_GROUP = '{2}'
    #             '''.format(state, status, species))
    query = '''SELECT SCIENTIFIC_NAME, VERNACULAR_NAME, habitat, threats  
                FROM threat_species
                WHERE {}=1
                AND LOWER(THREATENED_STATUS) = LOWER(%s)
                AND TAXON_GROUP = %s
            '''.format(state) 
    cur.execute(query, (status, species))#doubtful

    data = cur.fetchall()
    cur.close()
    db.close()
    descriptions = []
    for item in data:
        description={}
        description["title"] = item[1].split(",")[0]
        description["content"] = []
        description["content"].append({
            "title": "Scientific Name",
            "content": item[0]
        })
        description["content"].append({
            "title": "Common Name",
            "content": item[1]
        })
        description["content"].append({
            "title": "Habitat",
            "content": item[2]
        })
        description["content"].append({
            "title": "Threats",
            "content": item[3]
        })
        descriptions.append(description)
    return jsonify(descriptions)

# Iteration 2 api call
@app.route('/api/get_pollution/<year>', methods=['GET'])
def get_pollution(year):
    db = get_db_connection()
    cur = db.cursor()
    # cur.execute('''SELECT STATE_TERRITORY, START_LAT, START_LONG, POLYMER_TYPE  
    #                 FROM polymer_main
    #                 WHERE POLYMER_TYPE <> ''
    #                 AND SAMPLE_YEAR = '{0}'
    #             '''.format(year))
    query = '''SELECT STATE_TERRITORY, START_LAT, START_LONG, POLYMER_TYPE  
                FROM polymer_main
                WHERE POLYMER_TYPE <> ''
                AND SAMPLE_YEAR = %s
            '''
    cur.execute(query, (year,))
    data = cur.fetchall()
    cur.close()
    db.close()
    pollutions = []
    states = {}
    for item in data:
        if item[0] not in states:
            states[item[0]] = []
        states[item[0]].append({
            "lat": item[1],
            "long": item[2],
            "type": item[3]
        })
    for state, item in states.items():
        pollutions.append({
            "state": state,
            "pollutions": item
        })
    return jsonify(pollutions)

@app.route('/api/get_pollution_intensity/<year>', methods=['GET'])
def get_pollution_intensity(year):
    db = get_db_connection()
    cur = db.cursor()
    if year == '2025':
        cur.execute('''SELECT STATE_TERRITORY, START_LAT, START_LONG, COUNT(*)  
                        FROM polymer_main
                        GROUP BY STATE_TERRITORY, START_LAT, START_LONG
                    ''')
    else:
        query = '''SELECT STATE_TERRITORY, START_LAT, START_LONG, COUNT(*)  
                    FROM polymer_main
                    WHERE SAMPLE_YEAR = %s
                    GROUP BY STATE_TERRITORY, START_LAT, START_LONG
                '''
        cur.execute(query, (year,))
    data = cur.fetchall()
    cur.close()
    db.close()
    pollutions = []
    states = {}
    for item in data:
        if item[0] not in states:
            states[item[0]] = []
        states[item[0]].append({
            "lat": item[1],
            "long": item[2],
            "count": item[3]
        })
    for state, item in states.items():
        pollutions.append({
            "state": state,
            "pollutions": item
        })
    return jsonify(pollutions)

@app.route('/api/get_pollution_type_all/', methods=['GET'])
def get_pollution_type_all():
    db = get_db_connection()
    cur = db.cursor()
    # cur.execute('''SELECT SAMPLE_YEAR , POLYMER_TYPE, count(*) as count_type  
    #                 FROM polymer_main
    #                 group by POLYMER_TYPE ,SAMPLE_YEAR
    #                 order by SAMPLE_YEAR, count_type desc
    #             ''')
    query = '''SELECT SAMPLE_YEAR, POLYMER_TYPE, count(*) as count_type  
                FROM polymer_main
                GROUP BY POLYMER_TYPE, SAMPLE_YEAR
                ORDER BY SAMPLE_YEAR, count_type DESC
            '''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    db.close()
    pollutions = []
    pollution_type = {}
    types = ["polyethylene", "polypropylene", "polyethylene glycol", "polystyrene", "thermoset", "thermoplastic"]
    others = {}
    for item in data:
        if item[1] not in pollution_type:
            pollution_type[item[1]] = []
        if item[1] not in types:
            if item[0] not in others:
                others[item[0]] = 0
            others[item[0]] += item[2]
        else:
            pollution_type[item[1]].append({
                "count": item[2],
                "year": item[0]
            })
    others_pollution = []
    for year, count in others.items():
        others_pollution.append({
            "count": count,
            "year": year
        })
    for type, item in pollution_type.items():
        if type in types:
            pollutions.append({
                "type": type,
                "pollutions": item
            })  
    pollutions.append({
        "type": "other",
        "pollutions": others_pollution
    })
    return jsonify(pollutions)

@app.route('/api/get_pollution_type/<year>', methods=['GET'])
def get_pollution_type(year):
    db = get_db_connection()
    cur = db.cursor()
    if year != '2025':
        cur.execute('''SELECT STATE_TERRITORY , POLYMER_TYPE, count(*) as count_type  
                        FROM polymer_main
                        WHERE SAMPLE_YEAR = '{0}'
                        group by STATE_TERRITORY, POLYMER_TYPE
                        order by STATE_TERRITORY, count_type desc, POLYMER_TYPE
                    '''.format(year))
    else:
        cur.execute('''SELECT STATE_TERRITORY , POLYMER_TYPE, count(*) as count_type  
                    FROM polymer_main
                    group by STATE_TERRITORY, POLYMER_TYPE
                    order by STATE_TERRITORY, count_type desc, POLYMER_TYPE
                ''')
    data = cur.fetchall()
    if year != '2025':
        cur.execute('''SELECT POLYMER_TYPE, count(*) as count_type  
                        FROM polymer_main
                        WHERE SAMPLE_YEAR = '{}'
                        group by POLYMER_TYPE
                        order by count_type desc, POLYMER_TYPE
                    '''.format(year))
    else:
        cur.execute('''SELECT POLYMER_TYPE, count(*) as count_type  
                        FROM polymer_main
                        group by POLYMER_TYPE
                        order by count_type desc, POLYMER_TYPE
                    ''')
    data_allstate = cur.fetchall()
    cur.close()
    db.close()
    types = ["polyethylene", "polypropylene", "polyethylene glycol", "polystyrene", "thermoset", "thermoplastic"]
    # data for each state
    pollutions = []
    states = {}
    others = {}
    for item in data:
        if item[0] not in states:
            states[item[0]] = []
            for pollution_type in types:
                states[item[0]].append({
                    "type": pollution_type,
                    "count": 0
                })
        if item[1] not in types:
            if item[0] not in others:
                others[item[0]] = 0
            others[item[0]] += item[2]
        else:
            states[item[0]][types.index(item[1])]["count"] = item[2]
    for pollution_state, count in others.items():
        states[pollution_state].append({
            "count": count,
            "type": "other"
        })
    for pollution_state, item in states.items():
        pollutions.append({
            "state": pollution_state,
            "pollutions": item
        })
    #  data for all state
    states_all = []
    others_all = 0
    for pollution_type in types:
        states_all.append({
            "type": pollution_type,
            "count": 0
        })
    for item in data_allstate:
        if item[0] not in types:
            others_all += item[1]
        else:
            states_all[types.index(item[0])]["count"] = item[1]
    states_all.append({
        "count": others_all,
        "type": "other"
    })
    pollutions.append({
        "state": "ALL",
        "pollutions": states_all
    })
    return jsonify(pollutions)

@app.route('/api/get_pollution_type_suggestions/<polymer>', methods=['GET'])
def get_pollution_type_suggestions(polymer):
    db = get_db_connection()
    cur = db.cursor()
    # cur.execute('''SELECT Polymer_source , `Plastic Items`, `Plastic Alternatives`  
    #                 FROM polymer_suggestions
    #                 WHERE `﻿Polymer type` = '{0}'
    #             '''.format(polymer))
    query = '''SELECT * 
                    FROM polymer_suggestions_icon
                WHERE `Polymer type` = %s
            '''
    cur.execute(query, (polymer,))
    data = cur.fetchall()
    cur.close()
    db.close()
    suggestions = {
        "sources": [],
        "products": [],
        "other": []
    }
    suggestions["sources"] = re.split(r'\s*,\s*', data[0][1])
    for item in data:
        product = item[2]
        product_img = re.findall(r'src="([^"]+)"',item[3])
        product_alt = re.findall(r'alt="([^"]+)"',item[3])
        alt = item[4]
        alt_img = re.findall(r'src="([^"]+)"',item[5])
        alt_alt = re.findall(r'alt="([^"]+)"',item[5])
        if alt != "":
            suggestions["products"].append([
            {
                "name": product,
                "img": product_img[0],
                "alt": product_alt[0]
            },
            {
                "name": alt,
                "img": alt_img[0],
                "alt": alt_alt[0]
            }
            ])
        else:
            suggestions["other"].append({
                "name": product,
                "img": product_img[0],
                "alt": product_alt[0]
            })
    return jsonify(suggestions)

def softmax(x):
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=0)


@app.route('/api/minigame/state_info', methods=['GET'])
def get_minigame_state_info():
    db = get_db_connection()
    cur = db.cursor()
    query = '''SELECT * FROM pollution_severity'''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    db.close()

    stateInfo = []
    severe_array = []
    law_array = []

    for col in data:
        severe_array.append(col[5])
        law_array.append(-1*col[4])
    severe_array = softmax(np.array(severe_array))
    law_array = softmax(np.array(law_array))

    difficulty_array = []
    difficulty_level = []
    for count in range(len(severe_array)):
        cur_value = round((severe_array[count]*0.5 + law_array[count] * 0.5) * 25)
        difficulty_array.append(cur_value)
        if cur_value >= 0 and cur_value <= 2:
            difficulty_rating = "EASY"
        elif cur_value >= 3 and cur_value <= 4:
            difficulty_rating = "MEDIUM"
        else:
            difficulty_rating = "HARD"
        difficulty_level.append(difficulty_rating)


    my_count = 0
    for col in data:
        stateInfo.append({
            "state": col[0],
            "name": col[1],
            "polymerCount": col[2],
            "marineLaws": col[4],
            "pollutionSeverity": round(severe_array[my_count]*100),
            "score": col[6],
            "difficulty": difficulty_array[my_count],
            "difficultyLevel": difficulty_level[my_count],
        })
        my_count += 1

    return jsonify(stateInfo)

@app.route('/api/minigame/updatescore', methods=['POST'])
def update_minigame_score():
    data = request.get_json()
    state = data.get('state')  
    score = data.get('score')
    

    db = get_db_connection()
    cur = db.cursor()

    query = '''UPDATE pollution_severity SET score = %s WHERE state = %s'''
    cur.execute(query, (score, state,))
    #cur.execute("UPDATE pollution_severity SET score = %s WHERE state = %s", (score, state,))

    db.commit()
    cur.close()
    db.close()

    return jsonify({"message": "Option count updated"}), 200

@app.route('/api/minigame/general_fact', methods=['GET'])
def get_minigame_general_fact():
    db = get_db_connection()
    cur = db.cursor()
    query = '''SELECT * FROM facts'''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    db.close()

    fact_array = []
    for col in data:
        fact_array.append({
            "factId": col[0],
            "title": col[1],
            "description": col[2],
            "references": col[3],
        })

    return jsonify(fact_array)

@app.route('/api/minigame/fact_state_knowledge', methods=['GET'])
def get_minigame_state_fact():
    db = get_db_connection()
    cur = db.cursor()
    query = '''SELECT * FROM fact_state_knowledge'''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    db.close()

    fact_array = []
    for col in data:
        fact_array.append({
            "factId": col[1],
            "state": col[0],
            "title": col[2],
            "description": col[3],
        })

    return jsonify(fact_array)

@app.route('/api/marinelife/marine_life_logo_images', methods=['GET'])
def get_marine_life_logo_images():
    db = get_db_connection()
    cur = db.cursor()
    query = '''SELECT * FROM marine_life_logo_images'''
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    db.close()

    fact_array = []
    for col in data:
        fact_array.append({
            "name": col[0],
            "icon": col[1],
            "alt": col[2],
            "image": col[3],
        })

    return jsonify(fact_array)

if __name__ == '__main__':
    app.run(debug=True)
