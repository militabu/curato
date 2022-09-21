import React, { ReactElement } from "react";
import { useAppSelector } from "../redux/hooks";

function MainScreen(): ReactElement {

  const screen: number = useAppSelector(state => state.screen);

  const colorMap : { [key:string]: number|string}= {
    '0' : '#8d8dda',
    '1' : '#859df2',
    '2' : '#edc68c'
  }

  const bgClass = `flex font-bold bg-[${colorMap[screen.toString()]}]`;

  console.log('Selected background color: ', bgClass);

  return (
    <div className={bgClass}>
      <div className="text-3xl underline">
        Here is the Main Screen!
      </div>
    </div>
  );
}

export default MainScreen;
