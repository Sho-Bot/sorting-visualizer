
export function mergeSortAnimations(array) {
  if(array.length < 2) return array
  const animations = [];
  const elements = [];
  for(let i = 0; i < array.length; i++) {
      let element = {value: array[i], index: i}
      elements.push(element);
  }
  mergeSort(array, elements, animations);
  return animations;
}


function mergeSort(array, elements, animations) {
  //check if array can be split 
  if(elements.length < 2) return elements;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ;
  //get middle index
  const middle = Math.floor(elements.length/ 2);
  //split temp array down into left and right components
  let left = elements.slice(0, middle);
  let right = elements.slice(middle);
  //recursively continue spliting arrays
  return mergeHelper(mergeSort(array, left, animations), mergeSort(array, right, animations), animations, array);
}


function mergeHelper(left, right, animations, array) {
  let sortedArray = [];
  let rangeOfIndices = [];
  let start = left[0].index;
  let end = right[right.length-1].index;
  let finalMerge = ((left.length + right.length) === array.length);

  for(let i = start; i <= end; i++){
    rangeOfIndices.push(i);
  }

  while(left.length && right.length) {
    let nextIndex = rangeOfIndices.shift();

    let highlightElements = {
      values: [left[0].value, right[0].value],
      indices: [nextIndex, right[0].index],
      swap: false,
      color: 'highlight'
    }
    let revertElements = {
      values: [left[0].value, right[0].value],
      index: [right[0].index],
      swap: false,
      color: 'revert'
    }

    animations.push(highlightElements);
    animations.push(revertElements);

    if(finalMerge) {
      if(left[0].value <= right[0].value) {
        let element = {value: left[0].value, index: nextIndex, color: 'color'};
        let alteredElements = {value: left[0].value, index: nextIndex, swap: false, color: 'correct'};
        //let revertElements = {type: 'single', value: left[0].value, index: nextIndex, swap: false, color: 'revert'};

        if(nextIndex === left[0].index) element.swap = false;
        else element.swap = true;

        left.shift();
        animations.push(element);
        animations.push(alteredElements);
        //animations.push(revertElements);
        sortedArray.push(element);
      }
      else { //(right[0].value < left[0].value)
        let element = {value: right[0].value, index: nextIndex, color: 'color'};
        let alteredElements = {value: right[0].value, index: nextIndex, swap: false, color: 'correct'};
        //let revertElements = {type: 'single', value: right[0].value, index: nextIndex, swap: false, color: 'revert'};

        if(nextIndex === right[0].index) element.swap = false;
        else element.swap = true;

        right.shift();
        animations.push(element);
        animations.push(alteredElements);
        //animations.push(revertElements);
        sortedArray.push(element);
      }

    }
    else {
      if(left[0].value <= right[0].value) {
        let element = {value: left[0].value, index: nextIndex, color: 'color'};
        let alteredElements = {value: left[0].value, index: nextIndex, swap: false, color: 'altered'};
        let revertElements = {type: 'single', value: left[0].value, index: nextIndex, swap: false, color: 'revert'};

        if(nextIndex === left[0].index) element.swap = false;
        else element.swap = true;

        left.shift();
        animations.push(element);
        animations.push(alteredElements);
        animations.push(revertElements);
        sortedArray.push(element);
      }
      else { //(right[0].value < left[0].value)
        let element = {
          value: right[0].value,
          index: nextIndex,
          color: 'color'
        };
        let alteredElements = {value: right[0].value, index: nextIndex, swap: false, color: 'altered'};
        let revertElements = {type: 'single', value: right[0].value, index: nextIndex, swap: false, color: 'revert'};

        if(nextIndex === right[0].index) element.swap = false;
        else element.swap = true;

        right.shift();
        animations.push(element);
        animations.push(alteredElements);
        animations.push(revertElements);
        sortedArray.push(element);
      }

    }



    /*

      let revertElements = {
        type: 'double',
        values: [left[0].value, right[0].value],
        indices: [nextIndex, right[0].index],
        swap: false,
        color: 'revert'
      }

      animations.push(revertElements);
      

      if(left[0].value <= right[0].value) {
        let element = {value: left[0].value, index: nextIndex, color: 'color'};
        let alteredElements = {value: left[0].value, index: nextIndex, swap: false, color: 'altered'};
        let revertElements = {type: 'single', value: left[0].value, index: nextIndex, swap: false, color: 'revert'};

        if(nextIndex === left[0].index) element.swap = false;
        else element.swap = true;

        left.shift();
        animations.push(element);
        animations.push(alteredElements);
        animations.push(revertElements);
        sortedArray.push(element);
      }
      else { //(right[0].value < left[0].value)
        let element = {
          value: right[0].value,
          index: nextIndex,
          color: 'color'
        };
        let alteredElements = {value: right[0].value, index: nextIndex, swap: false, color: 'altered'};
        let revertElements = {type: 'single', value: right[0].value, index: nextIndex, swap: false, color: 'revert'};

        if(nextIndex === right[0].index) element.swap = false;
        else element.swap = true;

        right.shift();
        animations.push(element);
        animations.push(alteredElements);
        animations.push(revertElements);
        sortedArray.push(element);
      }

      */
  }
      
  //while elements still exist in left and right
  while(left.length) {

    let nextIndex = rangeOfIndices.shift();

    let element = {
      value: left[0].value,
      index: nextIndex,
      color: 'color'
    };

    if(finalMerge) {

      let alteredElements = {value: left[0].value, index: nextIndex, swap: false, color: 'correct'};
      //let revertElements = {type: 'single', value: left[0].value, index: nextIndex, swap: false, color: 'revert'};

      if(nextIndex === left[0].index) element.swap = false;
      else element.swap = true;

      left.shift();
      animations.push(element);
      animations.push(alteredElements);
      //animations.push(revertElements);
    }
    else {
      let alteredElements = {value: left[0].value, index: nextIndex, swap: false, color: 'altered'};
      let revertElements = {type: 'single', value: left[0].value, index: nextIndex, swap: false, color: 'revert'};

      if(nextIndex === left[0].index) element.swap = false;
      else element.swap = true;

      left.shift();
      animations.push(element);
      animations.push(alteredElements);
      animations.push(revertElements);
    }

    sortedArray.push(element);
  }

  while(right.length){
    let nextIndex = rangeOfIndices.shift();

    let element = {
      value: right[0].value,
      index: nextIndex,
      color: 'color'
    };

    if(finalMerge) {
      let alteredElements = {value: right[0].value, index: nextIndex, swap: false, color: 'correct'};
      //let revertElements = {type: 'single', value: right[0].value, index: nextIndex, swap: false, color: 'revert'};

      if(nextIndex === right[0].index) element.swap = false;
      else element.swap = true;

      right.shift();
      animations.push(element);
      animations.push(alteredElements);
      //animations.push(revertElements);
    }
    else {

      let alteredElements = {value: right[0].value, index: nextIndex, swap: false, color: 'altered'};
      let revertElements = {type: 'single', value: right[0].value, index: nextIndex, swap: false, color: 'revert'};

      if(nextIndex === right[0].index) element.swap = false;
      else element.swap = true;

      right.shift();
      animations.push(element);
      animations.push(alteredElements);
      animations.push(revertElements);
    }


    sortedArray.push(element);
  }
  return sortedArray;
}