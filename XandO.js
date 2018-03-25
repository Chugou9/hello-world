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
        count++;
        updateTable(cell);
        

    } else {
        alert('Поле уже занято!');
    }
    
}
function updateTable(cell) {

    document.getElementById(cell).innerHTML = turn;
    
    turn = (turn === "X") ? "O" : "X";

    if (count >= 4) {
        checkConditions();
    } else return;
}

function checkArray(arr, i, j) {
        
        if (arr[i][j] === (-3)) {            
            return true;
        };        
        return false;
}

function checkConditions() {
    if (checkRows() || checkColumns()
    || checkMainDiagonal() || checkFalseDiagonal()) {
        return true;
    }	else if (count == 9) {
        checkWinner();
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
function checkWinner() {
    if (checkRows() || checkColumns()
    || checkMainDiagonal() || checkFalseDiagonal()){
        return true;
    } else {
        return nowinner();
    }
}
function nowinner() {
    $(".text-winner").text('Ничья!');            
    disable();
}
function disable () {
    $("#panel").slideToggle("slow");
    $("table").find("td").animate({opacity: 0.2}, "slow");    
    $("table").find("td").off("click");
    $(".form-action").find("#again").prop("disabled", false); 
}
function checkSum(sum) {

    if (sum == 3) {       
            $(".text-winner").text('Победили крестики!');
            disable();
            return true;                              
        
    } else if (sum == 0) {            
                $(".text-winner").text('Победили нолики!');                   
                disable();
                return true;            
    } else {
        return false;
    }
}

function checkRows() {

    for ( let i = 0; i < array.length; i++ ) {
        let sum = 0;

        array[i].forEach(function(item, k) {
            sum = sum + +item;        
        });        
        checkSum(sum);
    }
}

function checkColumns() {

    for ( let j = 0; j < array.length; j++ )	 {
        let sum = 0;
         for ( let i = 0; i < array.length; i++ ) {
            sum += array[i][j];       
        }
        checkSum(sum);
    }
}

function checkMainDiagonal() {    
    let sum = 0;

    for ( let i = 0; i < array.length; i++ ) {        
        sum += array[i][i]; 
    }

    checkSum(sum);
}

function checkFalseDiagonal() {

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

    
