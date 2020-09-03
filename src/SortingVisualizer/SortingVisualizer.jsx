import React from 'react';
import {mergeSortAnimations} from '../sortingAlgorithms/mergeSort.js'
import {bubbleSortAnimations} from '../sortingAlgorithms/bubbleSort.js'
import {heapSortAnimations} from '../sortingAlgorithms/heapSort.js'
import {quickSortAnimations} from '../sortingAlgorithms/quickSort.js' 
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
let NUMBER_OF_ARRAY_BARS = 150;

// This is the default color of the array bars.
const BASE_COLOR = 'lightslategrey' //'#f0f0f0';

// This is the color of array bars that are being compared throughout the animations.
const HIGHLIGHT_COLOR = '#fc5185';

//This is the color of the array bars that are being updated with a new height value.
const ALTERED_COLOR = '#43dde6';

//This is the color of the array bars that are maintaining their original height value.
const CORRECT_COLOR = '#a7ff83';

    

export default class SortingVisualizer extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: []
        };
    }


    componentDidMount() {
        this.newArray();
    }


    newArray() {
          const newArray = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            newArray.push(randomInt(5,400));
        }
        
        this.setState({array: newArray});

        //reset array color to base color
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = BASE_COLOR;
        }
    }


    mergeSort() {
        this.disableButtons('mergeSort');
        const animations = mergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar')

        for(let i = 0; i < animations.length; i++) {

            if(animations[i].swap === false) {
                if(animations[i].color === 'highlight') {
                    const [barOneIdx, barTwoIdx] = animations[i].indices;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = HIGHLIGHT_COLOR;
                        barTwoStyle.backgroundColor = HIGHLIGHT_COLOR;
                    }, i*ANIMATION_SPEED_MS);
                }
                else if(animations[i].color === 'altered') {
                    const barOneIdx = animations[i].index;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = ALTERED_COLOR;
                    }, i*ANIMATION_SPEED_MS);
                }
                else if(animations[i].color === 'correct') {
                    const barOneIdx = animations[i].index;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = CORRECT_COLOR;
                    }, i*ANIMATION_SPEED_MS);
                }
                else if(animations[i].color === 'revert') {
                    if(animations[i].type === 'double') {
                        const [barOneIdx, barTwoIdx] = animations[i].indices;
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        setTimeout(() => {
                            barOneStyle.backgroundColor = BASE_COLOR;
                            barTwoStyle.backgroundColor = BASE_COLOR;
                        }, i*ANIMATION_SPEED_MS);
                    }
                    else {
                        const barOneIdx = animations[i].index;
                        const barOneStyle = arrayBars[barOneIdx].style;
            
                        setTimeout(() => {
                            barOneStyle.backgroundColor = BASE_COLOR;
                        }, i*ANIMATION_SPEED_MS);
                    }
                }
            }
            else {
                const barOneIdx = animations[i].index;
                const barOneStyle = arrayBars[barOneIdx].style;
                
                setTimeout(() => {
                    let height = animations[i].value;
                    barOneStyle.height = `${height}px`;
                }, i*ANIMATION_SPEED_MS)
            }
        }

        let updatedArray = [];
        //const arrayBars = document.getElementsByClassName('array-bar')
        for(let i = 0; i < this.state.array.length; i++) {
            updatedArray.push(arrayBars[i].style.height);
        }
        this.setState({array: updatedArray});
        
        setTimeout(() => {
            this.enableButtons('mergeSort');
        }, (animations.length*ANIMATION_SPEED_MS));
    }
      

    bubbleSort() {
        this.disableButtons('bubbleSort');
        const animations = bubbleSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar')

        for(let i = 0; i < animations.length; i++) {
            if(animations[i].code === 'highlight') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = HIGHLIGHT_COLOR;
                    barTwoStyle.backgroundColor = HIGHLIGHT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'swap') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const [barOneHeight, barTwoHeight] = animations[i].values;
                setTimeout(() => {
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'correct') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = CORRECT_COLOR;
                    barTwoStyle.backgroundColor = CORRECT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'altered') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = ALTERED_COLOR;
                    barTwoStyle.backgroundColor = ALTERED_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'revert') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = BASE_COLOR;
                    barTwoStyle.backgroundColor = BASE_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else { //color element in final position
                const finalIndex = animations[i].index;
                const finalBarStyle = arrayBars[finalIndex].style;
                setTimeout(() => {
                    finalBarStyle.backgroundColor = CORRECT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
        }

        let updatedArray = [];
        const display = document.getElementsByClassName('array-bar')
        for(let i = 0; i < this.state.array.length; i++) {
            updatedArray.push(display[i].style.height);
        }
        this.setState({array: updatedArray});
        
        setTimeout(() => {
            this.enableButtons('bubbleSort');
        }, (animations.length*ANIMATION_SPEED_MS));
    }


    heapSort() {
        this.disableButtons('heapSort');
        let animations = heapSortAnimations(this.state.array)
        const arrayBars = document.getElementsByClassName('array-bar')

        for(let i = 0; i < animations.length; i++) {
        
            if(animations[i].code === 'highlight') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = HIGHLIGHT_COLOR;
                    barTwoStyle.backgroundColor = HIGHLIGHT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'swap') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const [barOneHeight, barTwoHeight] = animations[i].values;
                setTimeout(() => {
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'correct') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = CORRECT_COLOR;
                    barTwoStyle.backgroundColor = CORRECT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'altered') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = ALTERED_COLOR;
                    barTwoStyle.backgroundColor = ALTERED_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'altered-final') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = CORRECT_COLOR;
                    barTwoStyle.backgroundColor = BASE_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'parent-child-highlight') {
                const [parentIdx, leftIdx, rightIdx] = animations[i].indices;
                const parentStyle = arrayBars[parentIdx].style;
                const leftStyle = arrayBars[leftIdx].style;
                const rightStyle = arrayBars[rightIdx].style;
                setTimeout(() => {
                    parentStyle.backgroundColor = HIGHLIGHT_COLOR;
                    leftStyle.backgroundColor = HIGHLIGHT_COLOR;
                    rightStyle.backgroundColor = HIGHLIGHT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'child-revert') {
                const childIndex = animations[i].indices;
                const childStyle = arrayBars[childIndex].style;

                setTimeout(() => {
                    childStyle.backgroundColor = BASE_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'revert') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = BASE_COLOR;
                    barTwoStyle.backgroundColor = BASE_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
        }

        let updatedArray = [];
        const display = document.getElementsByClassName('array-bar')
        for(let i = 0; i < this.state.array.length; i++) {
            updatedArray.push(display[i].style.height);
        }
        this.setState({array: updatedArray});

        setTimeout(() => {
            this.enableButtons('heapSort');
        }, (animations.length*ANIMATION_SPEED_MS));
    }


    quickSort() {
        this.disableButtons('quickSort');

        let animations = quickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar')

        for(let i = 0; i < animations.length; i++) {
        
            if(animations[i].code === 'highlight') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = HIGHLIGHT_COLOR;
                    barTwoStyle.backgroundColor = HIGHLIGHT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'swap') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const [barOneHeight, barTwoHeight] = animations[i].values;
                setTimeout(() => {
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'altered') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = ALTERED_COLOR;
                    barTwoStyle.backgroundColor = ALTERED_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'altered-final') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = CORRECT_COLOR;
                    barTwoStyle.backgroundColor = BASE_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'final') {
                const barOneIdx = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = CORRECT_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
            else if(animations[i].code === 'revert') {
                const [barOneIdx, barTwoIdx] = animations[i].indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = BASE_COLOR;
                    barTwoStyle.backgroundColor = BASE_COLOR;
                }, i*ANIMATION_SPEED_MS);
            }
        }

        let updatedArray = [];
        const display = document.getElementsByClassName('array-bar')
        for(let i = 0; i < this.state.array.length; i++) {
            updatedArray.push(display[i].style.height);
        }
        this.setState({array: updatedArray});

        setTimeout(() => {
            this.enableButtons('quickSort');
        }, (animations.length*ANIMATION_SPEED_MS));

    }
    
    
    disableButtons(algorithm) {
        let buttons = ['newArray', 'mergeSort', 'quickSort', 'heapSort', 'bubbleSort'];
        //let buttons = ['newArray', 'mergeSort', 'quickSort', 'heapSort', 'bubbleSort'];
        for(let i = 0; i < buttons.length; i++) {
            document.getElementById(buttons[i]).disabled = true;

            if(algorithm === buttons[i]) {
                document.getElementById(buttons[i]).style.backgroundColor = '#fc5185';
                document.getElementById(buttons[i]).style.opacity = 1;
            }
            else {
                document.getElementById(buttons[i]).style.color = 'lightslategrey';
                document.getElementById(buttons[i]).style.borderColor = 'lightslategrey';
            }
        }
    }

    enableButtons(algorithm) {
        let buttons = ['newArray', 'mergeSort', 'quickSort', 'heapSort', 'bubbleSort'];
        for(let i = 0; i < buttons.length; i++) {
            document.getElementById(buttons[i]).disabled = false;

            if(algorithm === buttons[i]) {
                document.getElementById(buttons[i]).style.backgroundColor = 'transparent';
                document.getElementById(buttons[i]).style.opacity = 0.7;

            }
            else {
                document.getElementById(buttons[i]).style.color = '#f0f0f0';
                document.getElementById(buttons[i]).style.borderColor = '#f0f0f0'
            }
        }

    }


    
    


    render() {
        return (
        
            <div>
                <div className='nav-bar'>
                    <button class='alg-button' id='newArray'  onClick={() => {this.newArray()} }>Generate New Array</button>
                    <button class='alg-button' id='mergeSort' onClick={() => {this.mergeSort()} }>Merge Sort</button>
                    <button class='alg-button' id='quickSort' onClick={() => {this.quickSort()} }>Quick Sort</button>
                    <button class='alg-button' id='heapSort' onClick={() => {this.heapSort()}}>Heap Sort</button>
                    <button class='alg-button' id='bubbleSort' onClick={() => {this.bubbleSort()}}>Bubble Sort</button>
                </div>
                <div className='array-container'>
                    {this.state.array.map( num => {
                        return <div className='array-bar' style={{height: `${num}px`}} ></div>
                    })}
                    
                </div>
            </div>
        );
    }


}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}