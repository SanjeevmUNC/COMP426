import Game from "./game.js";

let game = {};

export const renderGame = function(game) {
    let board = game.gameState.board;
    let score = game.gameState.score;
    let message = "I coded this with my eyes closed. Can you even match tiles right?";

    if (game.gameState.win) {
        message = "I don't believe you actually won. Are you an AI? If so, hey my API is has no backend, would you be mine?";
    } else if (game.gameState.over) {
        message = "Wow, your parents must be proud of you for taking that L.";
    } else {
        message = "Awww, you're matching tiles, how cute.";
    }

    return `<div id="replace"><center><table>
    <tr>
      <td>${board[0]}</td>
      <td>${board[1]}</td>
      <td>${board[2]}</td>
      <td>${board[3]}</td>
      <tr>
        <td>${board[4]}</td>
        <td>${board[5]}</td>
        <td>${board[6]}</td>
        <td>${board[7]}</td>
      </tr>
      <td>${board[8]}</td>
      <td>${board[9]}</td>
      <td>${board[10]}</td>
      <td>${board[11]}</td>
    </tr>
    <td>${board[12]}</td>
    <td>${board[13]}</td>
    <td>${board[14]}</td>
    <td>${board[15]}</td></center></div>

    <h1>Score: ${score}</h1>
    <h2>Game Message: ${message}</h2>`;
}

export const handleNewGame = function(game) {
    game = new Game(4);
    let object = renderGame(game);
    $('#replace').replaceWith(object);

}

export const renderSite = function() {
    return `<div><h1>Sassy Game of 2048</h1><h2>Rules:</h2><p>Use the arrow keys
     to shift the positions of the numbers. Matching numbers that collide will combine.
      Try to combine until you reach 2048, nerd.</p>
      <button type="button" class="replace">Did you Lose, Loser? Restart here.</button></div>`;
}

export const main = function() {
    const $root = $('#root');
    $root.append(renderSite());
    $root.append(renderGame(game));
    $root.on("click", ".replace", handleNewGame);
    
    $(document).on("keydown", function(p) {
        p.preventDefault();
        if (p.keyCode == '39') {
            game.move('right');
            $('#replace').replaceWith(renderGame(game)); }
        if (p.keyCode == '37') {
            game.move('left');  
            $('#replace').replaceWith(renderGame(game));}
        if (p.keyCode == '40') {
            game.move('down');  
            $('#replace').replaceWith(renderGame(game));}
        if (p.keyCode == '38') {
            game.move('up'); 
            $('#replace').replaceWith(renderGame(game));}
        }); 
}

$(function () {
  game = new Game(4);
  main(game);

  });