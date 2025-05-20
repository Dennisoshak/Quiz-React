import  React,{ Dispatch, memo, SetStateAction } from "react";
import Countdown from "react-countdown";

type TimerProps = {
    minutes:number,
    seconds:number,
    completed:boolean
}
interface Iprops {
    setTimesOver:Dispatch<SetStateAction<boolean>>,
    gameOver:boolean
}

const Timer:React.FC<Iprops> = (Iprops) => {
  const renderer = ({ minutes, seconds, completed}:TimerProps) => {
    if(Iprops.gameOver){
     console.log("game over")
    }
    if (completed) {
      Iprops.setTimesOver(true);
    } else {
      return (
        <span>
          Time left: {minutes}:{seconds}
        </span>
      );
    }
  };
  
  return (
  
    <div>
      <Countdown  date={Date.now() + 80000} renderer={renderer}></Countdown>
    </div>
    
  );
};

export default memo(Timer);