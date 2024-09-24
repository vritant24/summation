const str = "mr personalised beauty and health tech private limited";

//#region calcuation
const charToNumberMapping = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 1,
    'k': 2,
    'l': 3,
    'm': 4,
    'n': 5,
    'o': 6,
    'p': 7,
    'q': 8,
    'r': 9,
    's': 1,
    't': 2,
    'u': 3,
    'v': 4,
    'w': 5,
    'x': 6,
    'y': 7,
    'z': 8,
}

//a function that adds all the numbers in an array until we have a single digit
function getSingleDigit(nums) {
    const sum = nums.reduce((acc, curr) => acc + curr);
    return sum < 10 ? sum : getSingleDigit(sum.toString().split("").map(Number));
}

// a function that takes a word and converts its characters to numbers from the mapping
function convertWordToNumber(word) {
    const numbers = word.split("").map(char => charToNumberMapping[char]);
    return numbers;
}

// a function that takes a string and converts it to an array of words
function convertStringToArray(str) {
    return str.split(" ").filter(word => word.length > 0);
}

function findSpecialSum(str) {
    if (!str || str.length === 0) {
        return 0;
    }

    const words = convertStringToArray(str);

    if (words.length === 0) {
        return 0;
    }

    const numbers = words.map(word => convertWordToNumber(word));

    if (numbers.length === 0) {
        return 0;
    }

    const sums = numbers.map(nums => getSingleDigit(nums));

    // add all the sums until we have a single digit
    return getSingleDigit(sums);
}
//#endregion
console.log(findSpecialSum(str));

function calcInputSum() {
    let res = '0';
    try {
        const str = document.getElementById("input").value;

        //remove all non-alphabetic characters or spaces
        const regex = /[^a-zA-Z ]/g;
        const processedStr = str.replace(regex, "").toLowerCase();
    
        res = findSpecialSum(processedStr);
    } catch (error) {
        console.error(error);
        res = 'error'
    }

    document.getElementById("output").innerText = res;
    
}

function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this, args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function onInputChange() {    
    debounce(() => calcInputSum(), 200)();
}