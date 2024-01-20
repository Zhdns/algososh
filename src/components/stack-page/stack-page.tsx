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
  const [loader, setLoader] = React.useState<boolean>(false)
  const [delLoader, setDelLoader] = React.useState<boolean>(false)

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
    setLoader(true)
    stack.push(inputValue)
    setElements(stack.getElements())
    setAnimating(stack.getElements().length - 1)
    setHead(stack.getElements().length - 1)
    await delay(500)
    setAnimating(-1)
    setInputValue('')
    setLoader(false)
  }

  const del =  async () => {
    setDelLoader(true)
    stack.pop()
    setElements(stack.getElements())
    setAnimating(stack.getElements().length - 1)
    setHead(stack.getElements().length - 1)
    await delay(500)
    setAnimating(-1)
    setDelLoader(false)
  }

  const reset = () => {
    stack.isEmpthy()
    setElements(stack.getElements())
  }



  return (
    <SolutionLayout title="Стек">
      <div className={style.main}>
        <Input type="text" maxLength={4} isLimitText={true} extraClass={style.input}
        value={inputValue} onChange={input} data-testid='value'/>
        <Button text="Добавить" extraClass={style.button} onClick={add} disabled={buttonIsLock} isLoader={loader} data-testid='add'/>
        <Button text="Удалить" extraClass={style.button} onClick={del} disabled={delButtonIsLock} isLoader={delLoader} data-testid='delete'/>
        <Button text="Очистить" extraClass={style.button} onClick={reset} disabled={delButtonIsLock} data-testid='clean'/>
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
