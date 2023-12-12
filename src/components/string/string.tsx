import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import style from "./string.module.css"
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [input, setInput] = React.useState<string>('')
  const [output, setOutput] = React.useState<{element: string, status: ElementStates}[]>([])
  const [index, setIndex] = React.useState<number | null>(null)
  const [buttoIsLock, setButtonIsLock] = React.useState<boolean>(false)
  const [loader, setLoader] = React.useState<boolean>(false)



  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  React.useEffect(() => {
    if (input === '') {
      setButtonIsLock(true)
    } else { 
      setButtonIsLock(false)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const reverse = async () => {
    setLoader(true)
    let array = input.split('').map(el => ({element: el, status: ElementStates.Default}))
    for (let i = 0; i < array.length / 2; i++) {
      array[i].status = ElementStates.Changing
      array[array.length - 1 -i].status = ElementStates.Changing
      setOutput([...array])
      await sleep(500);
      [array[i], array[array.length - 1 -i]] = [array[array.length - 1 - i], array[i]]
      array[i].status = ElementStates.Modified
      array[array.length - 1 -i].status = ElementStates.Modified
      setOutput([...array])
      await sleep(500)
    }

    array.forEach(element => {
      if (element.status !== ElementStates.Modified) {
        element.status = ElementStates.Modified
      }
    })
    setInput('')
    setLoader(false)
  } 


  return (
    <SolutionLayout title="Строка">
     <div className={style.main}>
            <Input maxLength={11} type = "text" isLimitText={true} onChange={handleChange} value={input}/>
            <Button text='Рассчитать' onClick={reverse} disabled={buttoIsLock} isLoader={loader}/>
        </div>
        <div className={style.result}>
            {output.map((element, index) => (
              <Circle extraClass={style.circle} letter={element.element} state={element.status}/>
            ))}
        </div>
    </SolutionLayout>
  );
};
