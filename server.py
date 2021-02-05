from flask import Flask
from flask import render_template
from flask import request
from flask import redirect, url_for

app = Flask(__name__)


@app.route('/')
def index():
    '''renders the root page describing the survey and asking for consent'''
    return render_template('survey/index.html')


@app.route('/survey', methods=['GET', 'POST'])
def survey():
    if request.method == 'GET':
        return render_template('survey/survey.html')
    else: # request.method == 'POST':
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