angular.module('calcApp', [])
.controller('CalcCtrl', function($scope, $http) {
    // Initial display value.
    $scope.display = "0";

    // Used to evaluate whether to start a new number
    // in the display.
    $scope.operand1 = true;

    // Holds pending operation for equals().
    $scope.pendingOperation = null;

    // Show current operation in the display.
    $scope.operationSign = "";

    // Holds the running total as numbers are calculated.
    $scope.runningTotal = null;

    // Holds the number value of the string in the display.
    $scope.pendingValue = null;

    // Holds the number value of the string in the display.
    $scope.history = [];

    // Constants.
    const ADD = "adding";
    const SUBTRACT = "subtracting";
    const MULTI = "multiplying";
    const DIVIDE = "dividing";
    const EXP = "exponent";
    const SQRT = "square-root";
    const ADD_SIGN = "+";
    const SUBTRACT_SIGN = "-";
    const MULTI_SIGN = "*";
    const DIVIDE_SIGN = "÷";
    const EXP_SIGN = "ex";
    const SQRT_SIGN = "√";

    
    var h = location.hash;
    console.log(localStorage);
    if (!location.hash)
        h = location.hash = makeRand();
    for(var i =0; i < localStorage.length; i++){
        if (localStorage.key(i) == location.hash && localStorage.getItem(localStorage.key(i)) != "")
            $scope.history = JSON.parse(localStorage.getItem(h)); 
     }      
    if (!localStorage.h)
        localStorage.setItem(location.hash, JSON.stringify($scope.history));
    
    // Runs every time a number button is clicked.
    // Updates the display display and sets operand1 flag.
    $scope.updateDisplay = function (number) {
        if ($scope.display == "0" || $scope.operand1) {
            $scope.display = number;
            $scope.operand1 = false;
        } else {
            $scope.display += number.toString();
        }
        $scope.pendingValue = parseFloat($scope.display);
    };

    //  Runs every time the add button is clicked.
    $scope.add = function () {
        if ($scope.pendingValue && $scope.runningTotal) {
            $scope.runningTotal += $scope.pendingValue;
        } else if ($scope.runningTotal == null) {
            $scope.runningTotal = $scope.pendingValue;
        }
        setdisplay(String($scope.runningTotal));
        $scope.operationSign = ADD_SIGN;
        $scope.pendingOperation = ADD;
        $scope.operand1 = true;
        $scope.pendingValue = null;
    };

    // Runs every time the subtract button is clicked.
    $scope.subtract = function () {
        if ($scope.pendingValue && $scope.runningTotal) {
            $scope.runningTotal -= $scope.pendingValue;
        } else if ($scope.runningTotal == null) {
            $scope.runningTotal = $scope.pendingValue;
        }
        setdisplay(String($scope.runningTotal));
        $scope.operationSign = SUBTRACT_SIGN;
        $scope.pendingOperation = SUBTRACT;
        $scope.operand1 = true;
        $scope.pendingValue = null;
    };

    // Runs every time the multiply button is clicked.
    $scope.multi = function () {
        if ($scope.pendingValue && $scope.runningTotal) {
            $scope.runningTotal *= $scope.pendingValue;
        } else if ($scope.runningTotal == null) {
            $scope.runningTotal = $scope.pendingValue;
        }
        
        setdisplay(String($scope.runningTotal));
        $scope.operationSign = MULTI_SIGN;
        $scope.pendingOperation = MULTI;
        $scope.operand1 = true;
        $scope.pendingValue = null;
    };

    // Runs every time the divide button is clicked.
    $scope.divide = function () {
        if ($scope.pendingValue && $scope.runningTotal) {
            $scope.runningTotal /= $scope.pendingValue;
        } else if ($scope.runningTotal == null) {
            $scope.runningTotal = $scope.pendingValue;
        }
        
        setdisplay(String($scope.runningTotal));
        $scope.operationSign = DIVIDE_SIGN;
        $scope.pendingOperation = DIVIDE;
        $scope.operand1 = true;
        $scope.pendingValue = null;
    };

    // Runs every time the exponent button is clicked.
    $scope.exp = function () {
        if ($scope.pendingValue && $scope.runningTotal) {
            $scope.runningTotal = Math.pow($scope.runningTotal, $scope.pendingValue);
        } else {
            $scope.runningTotal = $scope.pendingValue;
        }
        
        setdisplay(String($scope.runningTotal));
        $scope.operationSign = EXP_SIGN;
        $scope.pendingOperation = EXP;
        $scope.operand1 = true;
        $scope.pendingValue = null;
    };

    // Runs every time the square root button is clicked.
    $scope.sqrt = function () {
        if ($scope.pendingValue) {
            $scope.runningTotal = Math.sqrt($scope.pendingValue, null)
        }
        
        setdisplay(String($scope.runningTotal));
        $scope.operationSign = SQRT_SIGN;
        $scope.pendingOperation = SQRT;
        $scope.operand1 = true;
        $scope.pendingValue = null;
    };

    // Runs when the equals (=) button is clicked.
    $scope.equals = function() {
        if(!$scope.operand1) {
            switch ($scope.pendingOperation) {
                case ADD:
                    $scope.add();
                    console.log("It is add");
                    break;
                case SUBTRACT:
                    $scope.subtract();
                    console.log("It is subst");
                    break;
                case MULTI:
                    $scope.multi();
                    console.log("It is multi");
                    break;
                case DIVIDE:
                    $scope.divide();
                    console.log("It is div");
                    break;
                case EXP: 
                    $scope.exp();
                    console.log("It is exp");
                    break;
                case SQRT:
                    $scope.sqrt();
                    console.log("It is sqrt");
                    break;
            }
        }
        $scope.runningTotal = $scope.display;
        setdisplay($scope.runningTotal);
        q($scope.runningTotal);
        $scope.operationSign = "";
        $scope.pendingOperation = null;
        $scope.pendingValue = null;
    }

    // Delete last digit entered.
    $scope.correctIt = function () {
        if ($scope.display.length == 1) {
            $scope.display = "0";
            $scope.pendingValue = parseFloat("0");
        } else {
            $scope.display = $scope.display.slice(0,-1);
            $scope.pendingValue = parseFloat($scope.display);
        }
    }

    // Initializes the appropriate values
    // when the clear button is clicked.
    $scope.clr = function () {
        $scope.runningTotal = null;
        $scope.pendingValue = null;
        $scope.pendingOperation = null;
        $scope.operationSign = "";
        setdisplay("0");
        $scope.save = true;
    };

    // Clears history .
    $scope.clearHistory = function () {
        for(var i =0; i < localStorage.length; i++){
            if (localStorage.key(i) == location.hash)
                localStorage.setItem(localStorage.key(i), "");
        } 
        $scope.history = [];
    };

    // Clears history .
    $scope.selectRes = function (result) {
        $scope.updateDisplay(result);
        // $scope.pendingValue = $scope.display;
    };

    // Updates the display and resets the operand1 flag.
    setdisplay = function (displayString) {
        $scope.display = displayString;
        $scope.operand1 = true;
    };

    // Save history result
    q = function (item) {
        if ($scope.history != null)
            if ($scope.history.length >= 10)
                $scope.history.shift();
        $scope.history.push(item);
        localStorage.setItem(location.hash, JSON.stringify($scope.history));
    }
    
    function makeRand() {
        var rand = "";
        var seed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
          rand += seed.charAt(Math.floor(Math.random() * seed.length));
        return rand;
      }
});