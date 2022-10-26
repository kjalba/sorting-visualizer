import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310/2;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#5CB8E4';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#FCE700';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // const { resetArray } = this.props;
    this.resetArray(NUMBER_OF_ARRAY_BARS);
    document.getElementById("changeSize").value = 187/2;
  }

  resetArray(num) {
    const array = [];
    // This for loop is to hard code # of array bars. Better to use screen 
    for (let i = 0; i < num; i++) { 
    // for (let i = 0; i < (window.screen.width-200)/4; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
    console.log(document.getElementById("changeSize").value);
  }

  handleChange(evt) {
    // const { resetArray } = this.props;

    this.resetArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
  }

  mergeSort(speed) {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * speed);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array, isRunning} = this.state;
    // const numWidth = Math.floor($(document).width() / (array.length * 3));
    // const numWidth = 20;
    

    const numWidth = array.length < 5 ?
      120 : array.length < 8 ?
        64 : array.length < 11 ?
          48 : array.length < 20 ?
            24 : array.length < 50 ?
              14 : array.length < 100 ?
                12 : array.length < 130 ?
                  10 : array.length < 150 ?
                    8 : array.length < 170 ?
                      6 : array.length < 190 ?
                        4 : array.length < 210 ?
                          2 : 2;
    // const margin = `${numMargin}px`;
    const width = `${numWidth}px`;

    const speed = array.length < 5 ?
    240 : array.length < 8 ?
      150 : array.length < 11 ?
        100 : array.length < 20 ?
          50 : array.length < 50 ?
            25 : array.length < 100 ?
              12 : array.length < 130 ?
                1 : 2;

    // var speed = 310 - array.length*2;
    
    //   if (speed <1) {
    //   speed = 1;
    //   }

    // const speed = 315 - array.length;

    return (
      <div className="array-container">

        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              // height: `${value * 3}px`, 
              width: width, 
              // marginLeft: margin, 
              // marginRight: margin,
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}>
            </div>
        ))}
        <div id='button-container'>
        <button onClick={() => this.resetArray(Math.floor((parseInt(document.getElementById("changeSize").value) + 3) * 1.65))}>Generate New Array</button>
        <button onClick={() => this.mergeSort(speed)}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
        <div
          id="arraySize"
          >
          Change Array Size & Sorting Speed
        </div>
        <input
          id="changeSize"
          type="range"
          min="0"
          max="187"
          // style={{background: color, cursor: cursor}}
          // disabled={isRunning ? "disabled" : null}
          onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}