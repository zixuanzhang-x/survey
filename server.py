from flask import Flask
from flask import render_template
from flask import request
from flask import redirect, url_for

import db

app = Flask(__name__)

# have the DB submodule set itself up before we get started.
@app.before_first_request
def initialize():
    db.setup()

@app.route('/')
def index():
    '''renders the root page describing the survey and asking for consent'''
    return render_template('survey/index.html')


@app.route('/survey', methods=['GET'])
def survey():
    return render_template('survey/survey.html')


@app.route('/survey', methods=['POST'])
def new_survey():
    with db.get_db_cursor(True) as cursor:
        nickname = request.form.get('nickname')
        best_day = request.form.get('best_day')
        best_time = request.form.get('best_time')
        info = request.form.get('info')

        # backend form validation
        fields = [nickname, best_day, best_time]
        if None in fields or '' in fields:
            return redirect(url_for('survey'))

        # log response
        app.logger.info(f"Adding a new response: (nickname: {nickname}, best_day: {best_day}, best_time: {best_time}, info: {info})")

        # insert response into database
        cursor.execute("INSERT INTO survey(nickname, best_day, best_time, info) values(%s, %s, %s, %s)", (nickname, best_day, best_time, info))

        return redirect(url_for('thanks'))

@app.route('/decline')
def decline():
    return render_template('survey/decline.html')


@app.route('/thanks')
def thanks():
    return render_template('survey/thanks.html')


@app.route('/api/results')
def results():
    reverse = request.args.get('reverse')
    if reverse:
        pass
    else:
        pass
    return {}


@app.route('/admin/summary')
def summary():
    return render_template('admin/summary.html')