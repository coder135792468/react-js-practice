import Game from "./game";

const TicTacToe = ()=>{
   return <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Game len={4}/>
   </div>;
}

export default TicTacToe;