/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution;
  var solutionBoard = new Board({n:n});
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      solutionBoard.togglePiece(i, j);
      if( solutionBoard.hasAnyRooksConflicts() ) {
        solutionBoard.togglePiece(i, j);
      }    
    }
  }
  solution = solutionBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount;
  if(n<0) {
    solutionCount = -1;
  } else if (n===0) {
    solutionCount = 1;
  } else {
    return (n*window.countNRooksSolutions(n-1));
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var solution; 
  var solutionBoard = new Board({n:n});
  var queensOnBoard = 0;

  if (n===0) {
    solution =[];
  } else if (n===2 || n===3){  
    return undefined;
  } else {
    var rowChecker = function (rowIndex, colIndex) {
      solutionBoard.togglePiece(rowIndex,colIndex);
      queensOnBoard++;
      if(solutionBoard.hasAnyQueensConflicts()) { //if there's a conflict
        solutionBoard.togglePiece(rowIndex,colIndex); //remove piece
        queensOnBoard--; 
        if (colIndex < n-1) {  //if not at rightmost column, go to the next square 
          rowChecker (rowIndex, colIndex + 1);
        }
        if(colIndex === n-1 && rowIndex !== n-1) {  //if at rightmost column edge and not last row, go to next row  
          rowChecker (rowIndex+1, 0);
        }  
        if(colIndex === n-1 && rowIndex === n-1) { //if at bottom right corner, we're done
          return;
        }
      } else { //no conflicts
        if(colIndex === n-1 && rowIndex === n-1) { // if at bottom right corner, we're done
          return;
        }
        if(colIndex === n-1 && rowIndex !== n-1) {  //if at rightmost column edge and not last row, go to next row
          rowChecker (rowIndex+1, 0);
        }  
        if (colIndex < n-1 ) {  //if not at rightmost column, go to the next square
          rowChecker (rowIndex, colIndex + 1);
        }
      }
    };

    var checkDifferentStartingSquares = function (rowIndex, colIndex) {
      rowChecker(rowIndex, colIndex);  
      if(queensOnBoard === n) {
        solution = solutionBoard.rows();
      } else {
        solutionBoard = new Board({n:n});
        queensOnBoard = 0;
        checkDifferentStartingSquares (rowIndex,colIndex+1);
      }
    };

    checkDifferentStartingSquares(0,0);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
