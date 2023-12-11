import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack-class";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import style from "./stack-page.module.css"
import { ElementStates } from "../../types/element-states";


export const StackPage: React.FC = () => {
  const [stack, setStack] = React.useState(new Stack<string>());
  const [inputValue, setInputValue] = React.useState<string>('')
  const [elements, setElements] = React.useState<string[]>([])
  const [buttonIsLock, setButtonIsLock] = React.useState<boolean>(false)
  const [delButtonIsLock, setDelButtonIsLock] = React.useState<boolean>(false)
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  const [animating, setAnimating] = React.useState<number>(-1)
  const [head, setHead] = React.useState<number>(-1)

  React.useEffect(() => {
    if (elements.length === 0) {
      setDelButtonIsLock(true)
    } else {
      setDelButtonIsLock(false)
    }
  },[elements])
  
  React.useEffect(() => {
    if (inputValue === '') {
      setButtonIsLock(true)
    } else {
      setButtonIsLock(false)
    }
  })



  const input = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const value = e.target.value
    setInputValue(value)
  }

  const add = async () => {
    stack.push(inputValue)
    setElements(stack.getElements())
    setAnimating(stack.getElements().length - 1)
    setHead(stack.getElements().length - 1)
    await delay(500)
    setAnimating(-1)
    setInputValue('')
  }

  const del =  async () => {
    stack.pop()
    setElements(stack.getElements())
    setAnimating(stack.getElements().length - 1)
    setHead(stack.getElements().length - 1)
    await delay(500)
    setAnimating(-1)
  }

  const reset = () => {
    stack.isEmpthy()
    setElements(stack.getElements())
  }



  return (
    <SolutionLayout title="Стек">
      <div className={style.main}>
        <Input type="text" maxLength={4} isLimitText={true} extraClass={style.input}
        value={inputValue} onChange={input}/>
        <Button text="Добавить" extraClass={style.button} onClick={add} disabled={buttonIsLock}/>
        <Button text="Удалить" extraClass={style.button} onClick={del} disabled={delButtonIsLock}/>
        <Button text="Очистить" extraClass={style.button} onClick={reset} disabled={delButtonIsLock}/>
      </div>
      <div className={style.second}>
        {elements.map((item, index) => (
          <Circle letter={item} index={index} key={index}
          state={index === animating ? ElementStates.Changing : ElementStates.Default}
          head={index === head ? 'Head' : ''}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
