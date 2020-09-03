export function quickSortAnimations(array) {
    let animations = [];

    return(quickSort(array, 0, array.length-1, animations)[1]);
}

function quickSort(array, left, right, animations) {

    if(left < right) {
        const pivotIndex = partitionHoare(array, left, right, animations)


        quickSort(array, left, pivotIndex-1, animations);
        let finalLeftAnimation = {code: 'final', indices: left}
        animations.push(finalLeftAnimation);
        quickSort(array, pivotIndex+1, right, animations);
        let finalRightAnimation = {code: 'final', indices: right}
        animations.push(finalRightAnimation);
        

    }

    return [array, animations];
}

function partitionHoare(array, left, right, animations) {
    const pivot = Math.floor((left + right) / 2);

    //put pivot element at back of the array;
    [array[pivot], array[right]] = [array[right], array[pivot]];

    let highlightAnimation = {code: 'highlight', indices: [pivot, right]}
    let swapAnimation = {code: 'swap', values: [array[pivot], array[right]], indices: [pivot, right]}
    let revertAnimation = {code: 'revert', indices: [pivot, right]}

    animations.push(highlightAnimation);
    animations.push(swapAnimation);
    animations.push(revertAnimation);
    
    let i = left - 1;
    for(let j = left; j < right; j++) {
        let highlight = {code: 'highlight', indices: [i+1, j]}
        animations.push(highlight);

        if(array[j] <= array[right]) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];

            let swapAnimation = {code: 'swap', values: [array[i], array[j]], indices: [i, j]}
            let alteredAnimation = {code: 'altered', indices: [i, j]}
            let revertAnimation = {code: 'revert', indices: [i, j]}

            animations.push(swapAnimation);
            animations.push(alteredAnimation);
            animations.push(revertAnimation);
        }
        else {
            let revert = {code: 'revert', indices: [i+1, j]}
            animations.push(revert);
        }
    }
    //swap pivot back into final position
    [array[i+1], array[right]] = [array[right], array[i+1]];

    let highlightAni = {code: 'highlight', indices: [i+1, right]}
    let swapAni = {code: 'swap', values: [array[i+1], array[right]], indices: [i+1, right]}
    let alteredFinalAnimation = {code: 'altered-final', indices: [i+1, right]}

    animations.push(highlightAni);
    animations.push(swapAni);
    animations.push(alteredFinalAnimation);

    return i+1;
}