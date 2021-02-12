var lastOp = 4;
var savedVal;
var resultShown = false;
var preventRepeatedAddition = false;


function pressNum(digit) {
    var output = document.getElementById('output');
    // console.log("you clicked: ", digit);
    // console.log("the current output was: ", parseInt(output.innerHTML));
    // console.log("the total is: ", parseFloat(output.innerHTML) + digit);
    // if (lastOp == 0) {
    //     output.innerHTML = digit;
    // } else {
    if (resultShown) {
        output.innerHTML = digit;
        resultShown = false;
        preventRepeatedAddition = false;
    } else if (!output.innerHTML.includes(".") && parseInt(output.innerHTML) == 0) {
        output.innerHTML = parseInt(output.innerHTML) + digit;
    } else {
        output.innerHTML = output.innerHTML += digit;
    }
    // }
}

function pressDec() {
    var output = document.getElementById('output');
    if (!output.innerHTML.includes(".")) {
        output.innerHTML = output.innerHTML + ".";
    }
}

// create operations object
var opsObj = {
    0: function(firstVal, secondVal) { return parseFloat(firstVal) + parseFloat(secondVal); },
    1: function(firstVal, secondVal) { return parseFloat(firstVal) - parseFloat(secondVal); },
    2: function(firstVal, secondVal) { return parseFloat(firstVal) * parseFloat(secondVal); },
    3: function(firstVal, secondVal) { return parseFloat(firstVal) / parseFloat(secondVal); }
}

// const holdPromise = new Promise((resolve, reject) => {
//     if (onclick()) {
//         resolve('resolved');
//         holdPromise.then(() => {
//             clearOutput();
//         })
//     }
// });

// var waitForNextPressAfterEqual = () => {
//     return new Promise(resolve => {
//         setTimeout(() => {}, 2000);
//         onmousedown(resolve());
//         holdPromise.then(() => {
//             clearOutput();
//         });
//         // setTimeout(() => {
//         //     resolve('resolved');
//         // }, 2000);
//     });
// }

async function setOperation(op) {
    // var lastOp;
    var output = document.getElementById('output');

    if (lastOp == 4) {
        console.log("starting calculations");        
        savedVal = output.innerHTML;
        lastOp = op;
        clearOutput();
    } else if (op == 0) {
        if (!preventRepeatedAddition) {
            console.log("last op is", lastOp);
            console.log("first: ", savedVal);
            console.log("prev: ", output.innerHTML);

            var secondVal = output.innerHTML;
            savedVal = opsObj[lastOp](savedVal, secondVal);
            output.innerHTML = savedVal;
            lastOp = 0;
            
            resultShown = true;
            preventRepeatedAddition = true;
            // console.log("holding result...");
            // const result = await waitForNextPressAfterEqual();
            // console.log("resume calculations");
            // document.addEventListener("click", clearOutput);
        }
    } else {
        console.log("lastOp is ", lastOp);

        var secondVal = output.innerHTML;
        savedVal = opsObj[lastOp](savedVal, secondVal);

        console.log("new saved: ", savedVal);
        lastOp = op;
        clearOutput();
    }
}

var clearOutput = () => { 
    console.log("output cleared.");
    console.log("saved val: ", savedVal); 
    document.getElementById('output').innerHTML = 0; 
}

// acts slightly differently than the clearOutput function
var clearButton = () => { clearOutput(); savedVal = 0; lastOp = 4; }