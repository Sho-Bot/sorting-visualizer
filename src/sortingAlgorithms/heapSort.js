export function heapSortAnimations(array) {
    if(array.length < 2) return array;
    const animations = [];
    let maxHeap = makeMaxHeap(array)

    //this for loop animates the array being ordered into a max heap
    for(let i = 0; i < array.length; i++) {
        let highlightAnimation = {code: 'highlight', indices: [maxHeap[i].index, i]}
        animations.push(highlightAnimation);

        let heapIndex = maxHeap[i].index;

        if(heapIndex !== i) {
            let temp = array[i];
            array[i] = maxHeap[i].value;
            array[heapIndex] = temp;

            for(let j = 0; j < maxHeap.length; j++) {
                if(maxHeap[j].index === i) {
                    maxHeap[j].index = heapIndex;
                }
            }

            let swapAnimation = {code: 'swap', values: [array[i], array[heapIndex]], indices: [i, heapIndex]}
            let alteredAnimation = {code: 'altered', indices: [i, heapIndex]}

            animations.push(swapAnimation);
            animations.push(alteredAnimation);
        }
        else {
            let correctAnimation = {code: 'correct', indices: [maxHeap[i].index, i]}
            animations.push(correctAnimation);
        }   

        let revertAnimation = {code: 'revert', indices: [maxHeap[i].index, i]}
        animations.push(revertAnimation)

        //set element indeces in maxHeap equal to where they are located in the array
        maxHeap[i].index = i;
        
    }

    //This is where we begin the heap sort
    while(maxHeap.length > 1) {
        //give element with largest value index of last element in heap
        let tempIndex = maxHeap[0].index;
        //give last element in heap index of 0
        maxHeap[0].index = maxHeap[maxHeap.length-1].index;
        maxHeap[maxHeap.length-1].index = tempIndex;
        //remove element with largest value and replace it the the last element in heap
        let maxElement = maxHeap.shift();
        maxHeap.unshift(maxHeap.pop())

        //animate the swap, shifted element is now in final position
        let highlightAnimation = {code: 'highlight', indices: [maxElement.index, maxHeap[0].index]}
        let swapAnimation = {code: 'swap', values: [maxElement.value, maxHeap[0].value], indices: [maxElement.index, maxHeap[0].index]}
        let alteredFinalAnimation = {code: 'altered-final', indices: [maxElement.index, maxHeap[0].index]}

        animations.push(highlightAnimation);
        animations.push(swapAnimation);
        animations.push(alteredFinalAnimation);
        
        //animate root element being bubbled down
        bubbleDown(maxHeap, 0, animations)

    }
    
    let finalAnimation = {code: 'correct', indices: [0, 0]}
    animations.push(finalAnimation);

    return animations;
}


function makeMaxHeap(array) {
    const elements = [];
    for(let i = 0; i < array.length; i++) {
        let element = {value: array[i], index: i}
        elements.push(element);

        bubbeleUp(elements, elements.length-1)
    }
    return elements;
}


function swap(elements, i, j) {
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
}


function swapElements(elements, i, j) {
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
    elements[i].index = i;
    elements[j].index = j;
}


function bubbeleUp(elements, childIndex) {
    if(childIndex === 0) return;
    const parentIndex = Math.floor((childIndex - 1) / 2);
    const parentVal = elements[parentIndex].value;
    const childVal = elements[childIndex].value;

    if(childVal > parentVal) { // Max Heap
        // swap values
        swap(elements, childIndex, parentIndex);
        //parent and child have swaped, so parent needs to be considered for bubble up
        bubbeleUp(elements, parentIndex);
    }
}


function bubbleDown(elements, parentIndex, animations) {
    const leftIndex = (parentIndex*2) + 1;
    const rightIndex = leftIndex + 1;
    let parentVal = elements[parentIndex].value;
    let bothValid = false;

    if(0 < leftIndex && leftIndex < elements.length && 0 < rightIndex && rightIndex < elements.length) {
        bothValid = true;
        //animations.push(highlightAnimation);
    }

    if(0 < leftIndex && leftIndex < elements.length) {
        const leftVal = elements[leftIndex].value;

        //switch needs to occur
        if(parentVal < leftVal) {
            //Left and right children exist
            if(bothValid) {
                let highlightAnimation = new Animation({code: 'parent-child-highlight', indices: [parentIndex, leftIndex, rightIndex]});
                let revertChildAnimation = new Animation({code: 'child-revert', indices: rightIndex});
                let swapAnimation = new Animation( {code: 'swap', values: [leftVal, parentVal], indices: [parentIndex, leftIndex]});
                let alteredAnimation = new Animation({code: 'altered', indices: [parentIndex, leftIndex]});
                let revertAnimation = new Animation({code: 'revert', indices: [parentIndex, leftIndex]});

                animations.push(highlightAnimation);
                animations.push(revertChildAnimation);
                animations.push(swapAnimation);
                animations.push(alteredAnimation);
                animations.push(revertAnimation);

                swapElements(elements, parentIndex, leftIndex);
                //console.log(elements[parentIndex].index + "  " + elements[parentIndex].value);
                //console.log(elements[leftIndex].index + "  " + elements[leftIndex].value);
                bubbleDown(elements, elements[leftIndex].index, animations)
                parentVal = elements[parentIndex].value;
            }
            else { //only left child exists
                let highlightAnimation = new Animation({code: 'highlight', indices: [parentIndex, leftIndex]});
                let swapAnimation = new Animation( {code: 'swap', values: [leftVal, parentVal], indices: [parentIndex, leftIndex]});
                let alteredAnimation = new Animation({code: 'altered', indices: [parentIndex, leftIndex]});
                let revertAnimation = new Animation({code: 'revert', indices: [parentIndex, leftIndex]});
                
                animations.push(highlightAnimation);
                animations.push(swapAnimation);
                animations.push(alteredAnimation);
                animations.push(revertAnimation);

                swapElements(elements, parentIndex, leftIndex);
                bubbleDown(elements, elements[leftIndex].index, animations)
                parentVal = elements[parentIndex].value;
            }
        }
    }
    if(0 < rightIndex && rightIndex < elements.length) {
        const rightVal = elements[rightIndex].value;

        //switch needs to occur
        if(parentVal < rightVal) {

            //Left and right children exist
            if(bothValid) {
                let revertChildAnimation = new Animation({code: 'child-revert', indices: leftIndex});
                let swapAnimation = new Animation( {code: 'swap', values: [rightVal, parentVal], indices: [parentIndex, rightIndex]});
                let alteredAnimation = new Animation({code: 'altered', indices: [parentIndex, rightIndex]});
                let revertAnimation = new Animation({code: 'revert', indices: [parentIndex, rightIndex]});

                animations.push(revertChildAnimation);
                animations.push(swapAnimation);
                animations.push(alteredAnimation);
                animations.push(revertAnimation);

                swapElements(elements, parentIndex, rightIndex);
                bubbleDown(elements, elements[rightIndex].index, animations)
            }
            else { //only right child exists
                let highlightAnimation = new Animation({code: 'highlight', indices: [parentIndex, rightIndex]});
                let swapAnimation = new Animation( {code: 'swap', values: [rightVal, parentVal], indices: [parentIndex, rightIndex]});
                let alteredAnimation = new Animation({code: 'altered', indices: [parentIndex, rightIndex]});
                let revertAnimation = new Animation({code: 'revert', indices: [parentIndex, rightIndex]});

                animations.push(highlightAnimation);
                animations.push(swapAnimation);
                animations.push(alteredAnimation);
                animations.push(revertAnimation);

                swapElements(elements, parentIndex, rightIndex);
                bubbleDown(elements, elements[rightIndex].index, animations)
            }
        }
    }
}   


function Animation({code, values, indices} = {}) {
    this.code = code;
    this.values = values; 
    this.indices = indices;
}