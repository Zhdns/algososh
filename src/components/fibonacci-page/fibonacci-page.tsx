import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./fibonacci-page.module.css"
import { Circle } from "../ui/circle/circle";





export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [fibonacciSequence, setFibonacciSequence] = React.useState<{ ind: number; num: number }[]>([]);
  const [buttonIsActive, setButtonIsActive] = React.useState<boolean>(false)
  const [loader, setLoader] = React.useState<boolean>(false)

  React.useEffect(() => {
    const numberValue = parseInt(inputValue, 10)
    if (numberValue > 0 && numberValue < 20) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [inputValue] )

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fibonacci(numm: number) {
    let a = 0 
    let b = 1
    
    if (numm > 0 ) {
      setFibonacciSequence([{ ind: 0, num: b }])
      setLoader(true)
    }
  
    for (let i = 1; i <= numm; i++) {
      let temp = a + b
      a = b
      b = temp 
      
      await sleep(500)
      setFibonacciSequence(prevSequence => [...prevSequence, { ind: i, num: b }]);

    }

    return setLoader(false)
  }
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  setInputValue(value)
  
};

async function sort() {
  const numberValue = parseInt(inputValue, 10); 
  if (!isNaN(numberValue)) { 
    await fibonacci(numberValue) 
  }
}

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
        <div className={style.main}>
            <Input max='19' type = "number" isLimitText={true} onChange={handleInputChange} />
            <Button text='Рассчитать' onClick={sort} disabled={!buttonIsActive} isLoader={loader}/>
        </div>
        <div className={style.result}>
            {fibonacciSequence.map((element, index) => (
              <Circle extraClass={style.circle} letter={element.num.toString()} index={index}/>
            ))}
        </div>
    </SolutionLayout>
  );
};
