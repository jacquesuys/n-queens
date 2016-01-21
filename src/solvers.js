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
  var rowChecker = function (rowIndex, colIndex) {
    solutionBoard.togglePiece(rowIndex,colIndex);
    if(solutionBoard.hasAnyQueensConflicts()) {
      solutionBoard.togglePiece(rowIndex,colIndex);
      console.log(solutionBoard.rows());
      while (colIndex < n-1) {
        rowChecker (rowIndex, colIndex + 1);
      }
      if(colIndex === n-1 && rowIndex !== n-1) {
        rowChecker (rowIndex+1, 0);
      }  
    } else { //no conflicts
      if(colIndex === n-1 && rowIndex === n-1) {
        return;
      }
      while (colIndex < n-1 ) {
        rowChecker (rowIndex, colIndex + 1);
      } 
      var piece = solutionBoard.get(rowIndex); 
      if (colIndex === n-1 && piece[piece.length-1] === 1 ) {
        rowChecker (rowIndex + 1, colIndex);
      }
    }
  };

  rowChecker(0,0);
  solution = solutionBoard.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
