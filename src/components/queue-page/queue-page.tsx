import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { QueueClass } from "./queue-class";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './queue-page.module.css'
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {

  const [queue, setQueue] = React.useState(new QueueClass<string>())
  const [inputValue, setInputValue] = React.useState<string>('')
  const [elements, setElements] = React.useState<string[]>([])
  const [head, setHead] = React.useState<number>(0);
  const [lastIndex, setLastIndex] = React.useState<number>(0)
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  const [animating, setAnimating] = React.useState<number>(-1)
  const [buttonIsLock, setButtonIsLock] = React.useState<boolean>(false)

  React.useEffect(() => {
    if(inputValue.length === 0) {
      setButtonIsLock(true)
    } else {
      setButtonIsLock(false)
    }
  })
  
  React.useEffect(() => {
    getElements()
  },[head])

  React.useEffect(() => {
    const index = queue.getElements().length + head - 1
    setLastIndex(index)
  },[head, elements])
  

  const getElements =  async () => {
    let displayedElements = new Array(7).fill('') 
    for (let i = 0; i < Math.min(7, queue.getElements().length); i++) {
        displayedElements[i + head] = queue.getElements()[i]
    }
    setElements(displayedElements)
  }

  const input = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const value = e.target.value
    setInputValue(value)
  }

  const addToQueue = async () => {
    if (head + queue.getElements().length <= 6) {
    queue.enqueue(inputValue);
    getElements()
    setAnimating(head + queue.getElements().length - 1 )
    await delay(500)
    setAnimating(-1)
    setInputValue('');
    } else {
      console.log(queue.getElements())
      console.log(head)
    }
  };
  
  const delFromQueue = async () => {
    setAnimating(head)
    await delay(500)
    queue.dequeue();
    setAnimating(-1) 
    setHead(prevHead => prevHead < 7 ? prevHead + 1 : 7);
  };

  const restart = () => {
    queue.isEmpty()
    setHead(0)
    setElements(new Array(7).fill(''))
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={style.main}>
        <Input type="text" maxLength={4} isLimitText={true} extraClass={style.input}
        value={inputValue} onChange={input}/>
        <Button text="Добавить" extraClass={style.button} onClick={addToQueue} disabled={buttonIsLock}/>
        <Button text="Удалить" extraClass={style.button} onClick={delFromQueue}/>
        <Button text="Очистить" extraClass={style.button} onClick={restart}/>
      </div>
      <div className={style.second}>
        {elements.map((item, index) => (
          <Circle key={index} index={index} letter={item} head={(index === head && (item !== '' || head === 7)) ? 'Head' : ''} 
          tail={index === lastIndex && item !== '' ? "Tail" : ''} state={index === animating ? ElementStates.Changing : ElementStates.Default}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

