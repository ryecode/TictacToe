import React, { useState } from 'react'
import logo from '../RYELogoV2.png'

const TicTacToe = () => {

    const [turn, setTurn] = useState('X');
    const [cell, setCell] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const [tie, setTie] = useState();

    // BoardState Evaluator //
    const checkWinner = (boxes) => {
            let patterns = {
                row: [
                    [0,1,2],
                    [3,4,5],
                    [6,7,8]
                ],
                column: [
                    [0,3,6],
                    [1,4,7],
                    [2,5,8]
                ],
                diagonal: [
                    [0,4,8],
                    [2,4,6]
                ]
            };
            for (let pattern in patterns) {
                patterns[pattern].forEach((combo) => {
                    // console.log(combo);
                    if (
                        boxes[combo[0]] === '' ||
                        boxes[combo[1]] === '' ||
                        boxes[combo[2]] === '' 
                    ) {
                        // do nothing yet
                    } else if (
                        boxes[combo[0]] === boxes[combo[1]] &&
                        boxes[combo[1]] === boxes[combo[2]]
                    ) {
                        setTie(false);
                        setWinner(boxes[combo[0]]);
                    } 
                });
            };   
    };

    const handleClick = (num) => {
        if (cell[num] !== ''){ // prompt due to already occupied cell
            alert('Box already occupied!');
            return;
        }
        if (winner) { // prompt to restart game due to there's already a winner
            alert(`${winner} already won! please restart game.`);
            return;
        }
        let boxes = [...cell]; // x-o turn switcher
        if (turn === 'X') {
            boxes[num] = 'X'
            setTurn('O');
        }
        else {
            boxes[num] = 'O'
            setTurn('X');
        }
        let filled = true; // check for draw game
            boxes.forEach((cell) => {
                if (cell === '') {
                    filled = false;
                }
            });
            if (filled) {
                setTie(true);
        };       
        checkWinner(boxes);
        setCell(boxes);
        // console.log(boxes);
    };

    // Restart Button //
    const handleRestart = () => {
        setTie(null);
        setWinner(null);
        setCell(Array(9).fill(''));
        setTurn('X');
    }

    const Cell = ({num}) => {
        return (
        <td onClick={() => handleClick(num)} style={{background:'red'}}>{cell[num]}</td>
        )
    }

// UI //
  return (
    <>
        <h1><img src={logo} alt="Rye Logo" /> Tic Tac Toe !</h1>
    <div className='gameBox'>
        <table>
            <h2 className='turn'> Turn: {turn} </h2>
            <tbody>
                <tr>
                    <Cell num={0} />
                    <Cell num={1} />
                    <Cell num={2} />
                </tr>
                <tr>
                    <Cell num={3} />
                    <Cell num={4} />
                    <Cell num={5} />
                </tr>
                <tr>
                    <Cell num={6} />
                    <Cell num={7} />
                    <Cell num={8} />
                </tr>
            </tbody>
        </table>
    </div>
    {winner && (
            <>
                <p><h3>{winner} is the winner!</h3></p>
                <button className='neon-button' onClick={() => handleRestart()} >Restart Game</button>
            </>
        )}
    {tie && (
            <>
                <p><h3>It's a Tie!</h3></p>
                <button className='neon-button' onClick={() => handleRestart()} >Restart Game</button>
            </>
        )}
    </>
    )
}

export default TicTacToe;