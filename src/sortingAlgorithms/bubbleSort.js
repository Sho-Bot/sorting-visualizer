export function bubbleSortAnimations(array) {
    if(array.length < 2) return array;
    const animations = [];

    let end = array.length-1;
    for(let i = end; i > 0; i--) {
        for(let j = 0; j < i; j++) {
            let highlightElements = {code: 'highlight', indices: [j, j+1]}
            let revertElements = {code: 'revert', indices: [j, j+1]}
            animations.push(highlightElements);
            //animations.push(revertElements);

            if(array[j] > array[j+1]) {
                let swapElements = {code: 'swap', values: [array[j+1], array[j]], indices: [j, j+1]}
                let alteredElements = {code: 'altered', indices: [j, j+1]}
                animations.push(swapElements);
                animations.push(alteredElements);
                animations.push(revertElements);

                let temp = array[j];
                array[j]  = array[j+1];
                array[j+1] = temp;
            }
            else {
                let correctElements = {code: 'correct', indices: [j, j+1]}
                animations.push(correctElements);
                animations.push(revertElements);
            }
        }        
        let finalElement = {code: 'final', index: i}
        animations.push(finalElement);
    }
    let finalElement = {code: 'final', index: 0}
    animations.push(finalElement);
    return animations;
}