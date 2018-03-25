var count = 0;
var array = [
    [],
    [],
    []
];		
var turn = "X";

instantArr();
function instantArr() { 
    for (let i = 0; i < array.length; i++){
        for(let j = 0; j < 3; j++){        
            array[i][j] = -3;            
        }
    }
}		
function ticTacToeClick(cell) {
    let cellId = cell;
    let length = cellId.length;
    let i,j;
    i = +cellId.charAt(length - 2);
    i--;

    j = +cellId.charAt(length - 1);
    j--;

    if (checkArray(array, i, j)) {
    
        if (turn === 'X') {
            array[i][j] = 1;
        } else if (turn === 'O') {
            array[i][j] = 0;
        }
        updateTable(cell);
        count++;

    } else {
        alert('Поле уже занято!');
    }
    
}
function updateTable(cell) {

    document.getElementById(cell).innerHTML = turn;
    
    turn = (turn === "X") ? "O" : "X";

    if (count >= 4) {
        checkWinner(array);
    } else return;
}

function checkArray(arr, i, j) {
        
        if (arr[i][j] === (-3)) {            
            return true;
        };        
        return false;
}

function checkConditions(array) {
    if (checkRows(array)){
        return true;
    } else if (checkColumns(array)) {
        return true;
    } else if (checkMainDiagonal(array)) {
        return true;
    } else if (checkFalseDiagonal(array))	{
        return true;	
    } else {
        return false;    
    }		
}
function reload() {
    $("#panel").slideToggle("slow");
    $("table").find("td").text("");    
    $("td").click(
        function() {
            var clickId = this.id;
            ticTacToeClick(clickId);
        });
    count = 0;
    array = [
        [],
        [],
        []
    ];		
    turn = "X";
    instantArr();
    $("table").find("td").animate({opacity: 1}, "fast");    
}
function checkWinner(array) {
    if (!checkConditions(array) && count > 7) {
        return function() {
            $(".text-winner").text('Ничья!');            
            disable();
        }();
    }
}
function disable () {
    $("#panel").slideToggle("slow");
    $("table").find("td").animate({opacity: 0.2}, "slow");    
    $("table").find("td").off("click");
    $(".form-action").find("#again").prop("disabled", false); 
}
function checkSum(sum) {

    if (sum == 3) {        
        return function (){
            $(".text-winner").text('Победили крестики!');
            disable();                              
        }();   
    } else if (sum == 0) {
            return function (){
                $(".text-winner").text('Победили нолики!');                   
                disable();
            }();
        } else {
        return false;
    }
}

function checkRows(array) {

    for ( let i = 0; i < array.length; i++ ) {
        let sum = 0;

        array[i].forEach(function(item, k) {
            sum = sum + +item;        
        });        
        checkSum(sum);
    }
}

function checkColumns(array) {

    for ( let j = 0; j < array.length; j++ )	 {
        let sum = 0;
         for ( let i = 0; i < array.length; i++ ) {
            sum += array[i][j];       
        }
        checkSum(sum);
    }
}

function checkMainDiagonal(array) {    
    let sum = 0;

    for ( let i = 0; i < array.length; i++ ) {        
        sum += array[i][i]; 
    }

    checkSum(sum);
}

function checkFalseDiagonal(array) {

    let sum = 0;

    for( let i = 0; i < array.length; i++) {
        sum += array[i][2 - i]; // ЖОПА!!!        
    }

    checkSum(sum);
}

$(document).ready(function () {
    $("td").click(function(){
            var clickId = this.id;
            ticTacToeClick(clickId);
        });
    
    $(".btn-slide").click(function() {
        $("#panel").slideToggle("slow");        
        return false;
    });
    
    $(".accordion h3").click(function () {
        $(this).next("div").slideToggle("slow")
        .siblings("div:visible").slideUp("slow");
        $(this).toggleClass("active");
        $(this).siblings("h3").removeClass("active");
    });

    $("#again").hover(function() {
        $(this).next("em").animate({opacity: "show", top: "-75"}, "slow");
    }, function() {
        $(this).next("em").animate({opacity: "hide", top: "-85"}, "fast");
    });
    $("#again").click(function(){
        reload();
    });   

    
    
});

    
