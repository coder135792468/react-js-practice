import { useState,useEffect } from "react";
import "./game.css";

const Game = ({len})=>{
  const [board,setBoard] = useState(Array(len).fill(Array(len).fill('.')));
  const [player,setPlayer] = useState('X');
  const [isGameOver,setIsGameOver] = useState();
  const handleChange = (i,j)=>{
     setBoard(board.map((col,ni)=>col.map((value,nj)=>(ni == i && nj == j)?player:value)));
     setPlayer((prevPlayer)=>prevPlayer == 'X'?"O":"X");
  }

  const checkWinner = ()=>{
    let res = [];
    let temp1 = [], temp2 = [];
    for(let i= 0;i<board.length;i++)res[i] = [];

    for(let i = 0;i<board.length;i++){
      if(board[i].every(val=>val == board[i][0] && val != '.'))return true;
      for(let j = 0;j<board[i].length;j++){
        res[j].push(board[i][j]);
      }
      temp1.push(board[i][i]);
      temp2.push(board[i][len-i-1]);
    };
    if(temp1.every(val=>val == temp1[0] && val != '.'))return true;
    if(temp2.every(val=>val == temp2[0] && val != '.'))return true;
    
    for(let i = 0;i<len;i++){
      if(res[i].every(val=>val == res[i][0] && val != '.'))return true;
    }
    return false;
  }

  useEffect(()=>{
    if(checkWinner()){
      setIsGameOver(true);
    }
  },[board]);



  return isGameOver?<div>Player {player == 'X'?2:1} won!!</div>:<div>
     {board.map((col,i)=><div key={i} className="box-row">
       {col.map((value,j)=><span key={j} onClick={()=>handleChange(i,j)} className="box">{value}</span>)}
     </div>)}
  </div>;
}

export default Game;