from flask import Flask, jsonify, request
from flask_cors import CORS 
import MySQLdb
import os
from dotenv import load_dotenv

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
    return MySQLdb.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        passwd=MYSQL_PASSWORD,
        db=MYSQL_DB,
        port=MYSQL_PORT
    )

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
    cur.execute('''SELECT q_id, question, option_1, option_2, option_3, option_4, correct_answer, 
                          count_option_1, count_option_2, count_option_3, count_option_4, explanation
                   FROM questionnaire''')
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
    cur.execute('''SELECT State, Critically_Endangered, Endangered, Vulnerable FROM threat_state_count''')
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
    cur.execute('''SELECT TAXON_GROUP, count(*) FROM threat_species
                WHERE {0}=1
                AND LOWER(THREATENED_STATUS) = LOWER("{1}")
                GROUP BY TAXON_GROUP
                '''.format(state, status))
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
    cur.execute('''SELECT SCIENTIFIC_NAME, VERNACULAR_NAME, habitat, threats  
                    FROM threat_species
                    WHERE {0}=1
                    AND LOWER(THREATENED_STATUS) = LOWER("{1}")
                    AND TAXON_GROUP = '{2}'
                '''.format(state, status, species))
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

if __name__ == '__main__':
    app.run(debug=True)
