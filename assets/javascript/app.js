function show(text, timerId) {
    clearInterval(timerId);
    $('#timer').empty();
    $('#answers').empty();
    $('#question').text(text);
    setTimeout(function () {
        if (++currentQuestion < questions.length)
            questions[currentQuestion].ask();
        else {
            $('#question').empty();
            $('#answers').html('<h3>Correct: ' + correct +
                '</h3><h3>Incorrect: ' + incorrect + '</h3>');
        }
    }, 3000);
}

class Question {
    constructor(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.timeLeft = 20;
    }

    ask() {
        $('#question').text(this.question);
        $('#answers').html('<p>' + this.answers.join('</p><p>') + '</p>')
        var that = this;
        $('#timer').text('Time Left: ' + this.timeLeft + ' seconds');
        var timerId = setInterval(function () {
            $('#timer').text('Time Left: ' + --that.timeLeft + ' seconds');
            if (!that.timeLeft) {
                show('Time\'s up', timerId);
                ++incorrect;
            }
        }, 1000);
        $('p').on('click', function () {
            if ($(this).text() === that.correctAnswer) {
                show('Correct!', timerId);
                ++correct;
            } else {
                show('Incorrect!', timerId);
                ++incorrect;
            }
        });
    }
}

var questions = [new Question('Who achieved the only perfect score in U.S. Championship history?',
    ['Paul Morphy', 'Jose Raul Capablanca', 'Robert James Fischer', 'Hikaru Nakamura'],
    'Robert James Fischer'),
new Question('According to Grandmaster Benjamin Finegold, one should never play __.',
    ['b5', 'f6', 'c4', 'Bf1'], 'f6'),
new Question('What was Fabiano Caruana\'s score after the classical time-control portion of the 2018 World Championship match?',
    ['4', '5', '6', '7'], '6'),
new Question('The move a6 is charactaristic of the _______ Sicilian.',
    ['Najdorf', 'Caruana', 'Fischer', 'Spassky'], 'Najdorf')];
var currentQuestion = 0;
var correct = 0;
var incorrect = 0;
questions[currentQuestion].ask();