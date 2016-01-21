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
  var solution = [];
  var solutionBoard = new Board({n:n});
  
  var subroutine = function (rowIndex, colIndex) {
    
    var currentSquare = [rowIndex,colIndex];
    solutionBoard.togglePiece(currentSquare[0], currentSquare[1]);
    for (var i=rowIndex; i<n; i++) {
      while (currentSquare[1] < n) {
        currentSquare[1]++;
        solutionBoard.togglePiece(currentSquare[0], currentSquare[1]);
        if(solutionBoard.hasAnyRooksConflicts()) {
          solutionBoard.togglePiece(currentSquare[0], currentSquare[1]);
        } 
      }
      currentSquare[0]++;
      currentSquare[1] = 0;
    }

  };
  subroutine(0,0);
  
// for(var i = rowIndex; i < n; i++) {
//   for(var j = colIndex; j < n; j++) {
//     solutionBoard.togglePiece(i, j);
//     if( solutionBoard.hasAnyRooksConflicts() ) {
//       solutionBoard.togglePiece(i, j);
//     }    
//   }
// }
  solution = solutionBoard.rows();
  

  
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
