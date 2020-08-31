import React from "react";
import { connect } from "react-redux";
import {
  decrementCounter,
  incrementCounter,
} from "../redux/actions/counterActions";
import { changeStore } from "../redux/actions/roleAction";

interface IAppProps {
  counter1: number;
  counter2: number;
  inc: () => void;
  dec: () => void;
  changeValue: (num: number) => void;
}

let counter = 0;

const App: React.FC<IAppProps> = ({
  inc,
  dec,
  changeValue,
  counter1,
  counter2,
}: IAppProps) => {
  return (
    <div>
      <button onClick={inc}>Increment</button>
      <button onClick={dec}>Decrement</button>
      <h1>{counter1}</h1>
      <button onClick={() => changeValue((counter++ ))}>
        Chooser button
      </button>
      <h1>{counter2}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    counter1: state.counter1.value,
    counter2: state.counter2.data,
  };
};

const mapDispatchToProps = {
  inc: incrementCounter,
  dec: decrementCounter,
  changeValue: changeStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
