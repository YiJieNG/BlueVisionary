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

@app.route('/api/questions', methods=['GET'])
def get_questions():
    db = get_db_connection()
    cur = db.cursor()
    cur.execute('''SELECT question_id, question, option_1, option_2, option_3, option_4, correct_answer, 
                          option_1_count, option_2_count, option_3_count, option_4_count, explanation
                   FROM questions''')
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
        cur.execute("UPDATE questions SET option_1_count = option_1_count + 1 WHERE question_id = %s", (question_id,))
    elif option_index == 1:
        cur.execute("UPDATE questions SET option_2_count = option_2_count + 1 WHERE question_id = %s", (question_id,))
    elif option_index == 2:
        cur.execute("UPDATE questions SET option_3_count = option_3_count + 1 WHERE question_id = %s", (question_id,))
    elif option_index == 3:
        cur.execute("UPDATE questions SET option_4_count = option_4_count + 1 WHERE question_id = %s", (question_id,))

    db.commit()
    cur.close()
    db.close()

    return jsonify({"message": "Option count updated"}), 200

if __name__ == '__main__':
    app.run(debug=True)
