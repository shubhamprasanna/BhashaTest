import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.renderQues = this.renderQues.bind(this);
    this.jumbledGrid = this.jumbledGrid.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      ArrayOfStrings: [
        "Winter is coming", "Donald Trump is the worst President", "Rahul Gandhi will be PM", "i love bikes", "Bangalore has the worst traffic", "Gone with the wind",
        "Around the world in 80 days", "LeBron James has the best dunk", "Now you see me", "The monk who sold his Ferrari"
      ],
      alertOn: false,
      AnswerGrid: [],
      QuestionGrid: [],
      currentQues: 0
    }
  }
  HandleClick(selectedWord) {
    var AnswerGrid = this.state.AnswerGrid;
    var QuestionGrid = this.state.QuestionGrid;
    AnswerGrid.push(selectedWord)
    this.setState({ AnswerGrid });
    var found = QuestionGrid.indexOf(selectedWord);
    while (found !== -1) {
      QuestionGrid.splice(found, 1);
      found = QuestionGrid.indexOf(selectedWord);
      if (QuestionGrid.length === 0) {
        ;
      }
    }
  }
  nextQues() {
    if(this.state.currentQues < this.state.ArrayOfStrings.length-1) {
      var currentQues = this.state.currentQues + 1;
      this.setState({ AnswerGrid: [] })
      this.setState({ currentQues })
    } else {
      this.toggle()
    }
    
  }
  refreshPage() {
    this.setState({ AnswerGrid: [] })
  }
  jumbledGrid() {
    var words = [];

    if (this.state.QuestionGrid.length) {
     ;
    }
    else if (this.state.AnswerGrid.length === this.state.ArrayOfStrings[this.state.currentQues].split(' ').length) {
      var AnswerGrid = this.state.AnswerGrid.toString();
      var originalString = this.state.ArrayOfStrings[this.state.currentQues].split(' ').toString();
      if (AnswerGrid === originalString) {
        return <div>
          <Button style={{ background: 'green !important', width: '100%' }} className='success-button' onClick={() => this.nextQues()}>Correct</Button>
          <Alert color="success" isOpen={this.state.alertOn}>
            You've Won! Hope you enjoyed the game!
          </Alert>
        </div>
      } else {
        return <Button style={{ background: 'red !important', width: '100%' }} className='danger-button' onClick={() => this.refreshPage()}>Incorrect</Button>
      }
    }
    else {
      words = this.state.ArrayOfStrings[this.state.currentQues].split(' ');
      this.setState({ QuestionGrid: words })
    }

    var QuestionGrid = this.state.QuestionGrid.map((i, index) => {
      return <Button key={index.toString()} onClick={() => this.HandleClick(i)}>{i}</Button>
    })
    return this.wordShuffle(QuestionGrid)
  }
  AnswerRender() {
    var AnswerGrid = this.state.AnswerGrid.map((i) => {
      return <Button key={i.toString()}>{i}</Button>
    })
    return AnswerGrid
  }
  renderQues() {
    return this.state.ArrayOfStrings[this.state.currentQues]
  }
  wordShuffle(QuestionGrid) {
    let counter = QuestionGrid.length;
    let temp;
    let index;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = QuestionGrid[counter];
      QuestionGrid[counter] = QuestionGrid[index];
      QuestionGrid[index] = temp;
    }
    return QuestionGrid;
  }

  toggle() {
    this,this.setState({
      alertOn: !this.state.alertOn
    });
  }
  render() {
    return (
      <div className="App">
        <h3 style={{ position: 'relative', top: '80px', color: 'darkblue'  }}>TEST APP</h3>
        <Row>
          <Col className='col-6 offset-3'>
            <Card className='card-area' >
              <CardHeader className='card-header'>Pick the words in order</CardHeader>
              <CardBody>
                <CardTitle className='card-content'>{this.renderQues()}</CardTitle>
                <CardText className='card-content'>

                  {this.AnswerRender()}
                </CardText>

              </CardBody>
              <CardFooter className='card-content'>
                {this.jumbledGrid()}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
