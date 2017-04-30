$( document ).ready(function() {
  var dialog = document.querySelector('dialog'),
      showModalButton = document.querySelector('.show-modal'),
      moves = ['', '', '', '', '',
               '', '', '', '',], 
      player1 = 'X', 
      player2 = 'O', 
      computer = player2,
      currentPlayer = player1,
      player1Wins = 0,
      player2Wins = 0,
      canvas = document.getElementById("line-canvas"),
      context = canvas.getContext("2d"),
      computerMode = false,
      gameOver = false,
      winner;

  function computerModeSelect() {

    if (computerMode == false) {

      computerMode = true;

    } else {

      computerMode = false;

    }

    if ($( '#computerSelect' ).hasClass("mdl-button--colored")) {

      $( '#computerSelect' ).removeClass("mdl-button--colored");
      $( '#player2count' ).removeClass("computerize");
      $( '.challengerText' ).html('Player 2');

    } else {

      $( '#computerSelect' ).addClass("mdl-button--colored");
      $( '#player2count' ).addClass("computerize");
      $( '.challengerText' ).html('Computer');

    }

    resetWinCount();
    reset();
    currentPlayer = player1;

  }

  function computerPlaceMove( moveLocation, computerMove ) {

    $( moveLocation ).html( currentPlayer );
    $( moveLocation ).off("mouseenter");
    $( moveLocation ).off("mouseleave");
    $( moveLocation ).off("click");
    moves[computerMove] = currentPlayer;
    gameOverCheck();
    changeCurrentPlayer();

  }

  function computerPlay() {

    var computerMove, moveLocation;

    if ( computerMode == true && moves.indexOf('') !== -1 && gameOver == false ) {

      var openMoves = [];

      for (var i = 0; i < 9; i++) {
        
        if ( moves[i] == '' ) {
          
          openMoves.push( i );
          
        }
        
      }

      computerMove = openMoves[Math.floor( Math.random() * openMoves.length )];

      if ( moves[0] == '' && moves[1] !== '' && moves[1] == moves[2] ) {

        computerMove = 0;

      } else if ( moves[0] == '' && moves[3] !== '' && moves[3] == moves[6] ) {

        computerMove = 0;

      } else if ( moves[0] == '' && moves[4] !== '' && moves[4] == moves[8] ) {

        computerMove = 0;

      }

      else if ( moves[1] == '' && moves[0] !== '' && moves[0] == moves[2] ) {

        computerMove = 1;

      } else if ( moves[1] == '' && moves[4] !== '' && moves[4] == moves[7] ) {

        computerMove = 1;

      } 

      else if ( moves[2] == '' && moves[0] !== '' && moves[0] == moves[1] ) {

        computerMove = 2;

      } else if ( moves[2] == '' && moves[5] !== '' && moves[5] == moves[8] ) {

        computerMove = 2;

      } else if ( moves[2] == '' && moves[4] !== '' && moves[4] == moves[6] ) {

        computerMove = 2;

      } 

      else if ( moves[3] == '' && moves[0] !== '' && moves[0] == moves[6] ) {

        computerMove = 3;

      } else if ( moves[3] == '' && moves[4] !== '' && moves[4] == moves[5] ) {

        computerMove = 3;

      }

      else if ( moves[4] == '' && moves[1] !== '' && moves[1] == moves[7] ) {

        computerMove = 4;

      } else if ( moves[4] == '' && moves[3] !== '' && moves[3] == moves[5] ) {

        computerMove = 4;

      } else if ( moves[4] == '' && moves[0] !== '' && moves[0] == moves[8] ) {

        computerMove = 4;

      } else if ( moves[4] == '' && moves[2] !== '' && moves[2] == moves[6] ) {

        computerMove = 4;

      }

      else if ( moves[5] == '' && moves[2] !== '' && moves[2] == moves[8] ) {

        computerMove = 5;

      } else if ( moves[5] == '' && moves[3] !== '' && moves[3] == moves[4] ) {

        computerMove = 5;

      }

      else if ( moves[6] == '' && moves[0] !== '' && moves[0] == moves[3] ) {

        computerMove = 6;

      } else if ( moves[6] == '' && moves[2] !== '' && moves[2] == moves[4] ) {

        computerMove = 6;

      } else if ( moves[6] == '' && moves[7] !== '' && moves[7] == moves[8] ) {

        computerMove = 6;

      }

      else if ( moves[7] == '' && moves[1] !== '' && moves[1] == moves[4] ) {

        computerMove = 7;

      } else if ( moves[7] == '' && moves[6] !== '' && moves[6] == moves[8] ) {

        computerMove = 7;

      }

      else if ( moves[8] == '' && moves[2] !== '' && moves[2] == moves[5] ) {

        computerMove = 8;

      } else if ( moves[8] == '' && moves[6] !== '' && moves[6] == moves[7] ) {

        computerMove = 8;

      } else if ( moves[8] == '' && moves[0] !== '' && moves[4] == moves[8] ) {

        computerMove = 8;

      }

      moveLocation = '#cell-' + computerMove;

      if ( moves[computerMove] == '' ) {

        computerPlaceMove( moveLocation, computerMove );

      }

    }

  }

  function updatePlayers() {

    resetWinCount();

    gameOver = false;
    moves = ['', '', '', '', '',
               '', '', '', ''];
    $( '.cell' ).empty();
    $( 'canvas' ).css( 'visibility', 'hidden' );
    $( '.cell:empty' ).on({
      mouseenter: showPlay,
      click: placeMove,
      mouseleave: removePlay
    });

    if ( player1 == 'X' ) {

      player1 = 'O';
      player2 = 'X';

      $( '#player1symbol' ).html('O');
      $( '#player2symbol' ).html('X');
      
    } else if ( player1 == 'O' ) {
      
      player1 = 'X';
      player2 = 'O';

      $( '#player1symbol' ).html('X');
      $( '#player2symbol' ).html('O');
      
    }
    
    currentPlayer = player1;

  }

  function changeCurrentPlayer() {

    if ( currentPlayer == player1 ) {

      currentPlayer = player2;

    } else {

      currentPlayer = player1;

    }

  }

  function showPlay() {

    $( this ).addClass( "cell-hover" ).html( currentPlayer );

  }
  
  function removePlay() {

    $( this ).removeClass( "cell-hover" ).empty();

  }

  function resetWinCount() {

    player1Wins = 0;
    player2Wins = 0;
    $( '#player1count' ).html( player1Wins );
    $( '.player1' ).attr( 'data-badge', player1Wins );
    $( '#player2count' ).html( player2Wins );
    $( '.challenger' ).attr( 'data-badge', player2Wins );

  }

  function countWin() {

    if ( currentPlayer == player1 ) {

      player1Wins++;
      $( '#player1count' ).html( player1Wins );
      $( '.player1' ).attr( 'data-badge', player1Wins );

    } else {

      player2Wins++;
      $( '#player2count' ).html( player2Wins );
      $( '.challenger' ).attr( 'data-badge', player2Wins );

    }

  }

  function win() {
    var winningPlayer;

    winner = currentPlayer;
    gameOver = true;

    if ( player1 == winner ) {

      winningPlayer = "Player 1";

    } else if ( player2 == winner ) {

      if ( computerMode == true ) {

        winningPlayer = "Computer";

      } else {

        winningPlayer = "Player 2";

      }

    }

    countWin();
    $( 'canvas' ).css( 'visibility', 'visible' );
    $( '#winner' ).html( winningPlayer + ' wins!' );
    setTimeout(function() { dialog.showModal() }, 1000);

  }
  
  function reset() {

    currentPlayer = winner;
    changeCurrentPlayer();

    gameOver = false;
    moves = ['', '', '', '', '',
               '', '', '', ''];
    $( '.cell' ).empty();
    $( 'canvas' ).css( 'visibility', 'hidden' );
    $( '.cell:empty' ).on({
      mouseenter: showPlay,
      click: placeMove,
      mouseleave: removePlay
    });

  }

  function gameOverCheck() {
    // horizontal  win conditions 
    if (moves[0] !== '' && moves[0] == moves[1] && moves[1] == moves[2]) {

      winningLine(50, 73, 450, 73);
      win();

    }

    else if (moves[3] !== '' && moves[3] == moves[4] && moves[4] == moves[5]) {

      winningLine(50, 233, 447, 233);
      win();

    }

    else if (moves[6] !== '' && moves[6] == moves[7] && moves[7] == moves[8]) {

      winningLine(50, 393, 447, 393);
      win();

    }

    // vertical  win conditions
    else if (moves[0] !== '' && moves[0] == moves[3] && moves[3] == moves[6]) {

      winningLine(90, 30, 90, 440);
      win();

    }

    else if (moves[1] !== '' && moves[1] == moves[4] && moves[4] == moves[7]) {

      winningLine(250, 30, 250, 440);
      win();

    }

    else if (moves[2] !== '' && moves[2] == moves[5] && moves[5] == moves[8]) {

      winningLine(410, 30, 410, 440);
      win();

    }

    // diagonal  win conditions
    else if (moves[0] !== '' && moves[0] == moves[4] && moves[4] == moves[8]) {

      winningLine(50, 33, 450, 433);
      win();

    }

    else if (moves[2] !== '' && moves[2] == moves[4] && moves[4] == moves[6]) {

      winningLine(450, 33, 50, 433);
      win();

    }

    // Draw condition
    else if ( moves.indexOf('') === -1 ) {

      $( '#winner' ).html( 'Draw' );
      dialog.showModal();

    }

  }

  function winningLine(startX, startY, endX, endY) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.strokeStyle = '#FFF59D';
    context.lineCap = 'round';
    context.lineWidth = 15;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();

  }
  
  function placeMove() { 

    var move = parseInt(this.id.substr(5, 6));

    if ( moves[move] === '' ) {

      $( this ).removeClass( "cell-hover" ).empty();
      $( this ).html( currentPlayer );
      $( this ).off( "mouseenter" );
      $( this ).off( "mouseleave" );
      $( this ).off( "click" );
      moves[move] = currentPlayer;
      gameOverCheck();
      changeCurrentPlayer();
      computerPlay();
      
    }

  }
  
  if ( ! dialog.showModal ) {

    dialogPolyfill.registerDialog(dialog);

  }

  showModalButton.addEventListener('click', function() {

    dialog.showModal();

  });
  
  dialog.querySelector('.close').addEventListener('click', function() {

    dialog.close();
    reset();

    if ( currentPlayer == player2 ) {

      computerPlay();

    }

  });

  $( '.cell:empty' ).on({
    mouseenter: showPlay,
    click: placeMove,
    mouseleave: removePlay
  });

  $( '#computerSelect' ).on({
    click: computerModeSelect
  });
  
  $( '#swapButton' ).on({
    click: updatePlayers
  });

});