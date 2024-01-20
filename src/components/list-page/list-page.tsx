import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./list-page.module.css"
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list-class";




export const ListPage: React.FC = () => {

  const [list, setList] = React.useState(new LinkedList<string>())
  const [inputValue, setInputValue] = React.useState<string>('')
  const [indexValue, setIndexValue] = React.useState<any>()
  const elements = list.toArray()
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  const [upperAnimating, setUpperAnimating] = React.useState<{index: number, status: ElementStates, value: string}  | null> (null)
  const [animating, setAnimating] = React.useState<ElementStates[] | null> (null)
  const [lowerAnimating, setLowerAnimating] = React.useState<{index: number, status: ElementStates, value: string} | null> (null)
  const [removebleValue, setRemovbleValue] = React.useState<boolean>  (false)
  const [buttonIsLock, setButtonIsLock] = React.useState<boolean>(false)
  const [delButtonIsLock, setDelButtonIsLock] = React.useState<boolean>(false)
  const [indexButtonIsLockAdd, setIndexButtonIsLockAdd] = React.useState<boolean>(false)
  const [indexButtonIsLockDel, setIndexButtonIsLockDel] = React.useState<boolean>(false)
  const [loader, setLoader] = React.useState<{status: boolean, value: string}>({status: false, value: ''})

  function generateRandomList(size: number, maxLength: number) {
    const randomStrings = Array.from({ length: size }, () => Math.random().toString(36).slice(2, maxLength + 2));
    const linkedList = new LinkedList<string>();
    randomStrings.forEach(str => linkedList.append(str));
    return linkedList;
  }
  
  React.useEffect(() => {
    const initialList = generateRandomList(5, 4); 
    setList(initialList);
  }, []);


  React.useEffect(() => {
    if (typeof indexValue !== 'number' || indexValue < 0 || indexValue >= list.toArray().length || inputValue === '') {
     setIndexButtonIsLockAdd(true)
    } else {
     setIndexButtonIsLockAdd(false)
    }
 }, [inputValue, indexValue, list]);


  React.useEffect(() => {
     if (inputValue === '') {
      setButtonIsLock(true)
     } else {
      setButtonIsLock(false)
     }
  }, [inputValue]);

  React.useEffect(() => {
    if (list.toArray().length === 0) {
      setDelButtonIsLock(true)
    } else {
      setDelButtonIsLock(false)
    }
  })

  React.useEffect(() => {
    if (typeof indexValue !== 'number' || indexValue < 0 || indexValue >= list.toArray().length || indexValue === undefined) {
      setIndexButtonIsLockDel(true)
    } else {
      setIndexButtonIsLockDel(false)
    }
  }, [indexValue, list])

  function handleInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInputValue(value)
  }

  function handleIndexValue(event: React.ChangeEvent<HTMLInputElement>) {
    const index = event.target.value;
    setIndexValue(index ? parseInt(index, 10) : undefined);
}



  const addToHead = async () => {
    const newList = new LinkedList<string>(list.toArray())
    let animationStates = [ElementStates.Modified, ...new Array(list.toArray().length).fill(ElementStates.Default)];
    setButtonIsLock(true)
    setDelButtonIsLock(true)
    setIndexButtonIsLockAdd(true)
    setIndexButtonIsLockDel(true)
    setLoader({status: true, value: 'h+'})
    setUpperAnimating({index: 0, status: ElementStates.Changing, value: inputValue})
    await delay(500)
    newList.prepend(inputValue)
    setUpperAnimating(null)
    setList(newList)
    setAnimating(animationStates)
    await delay(500)
    setAnimating(null)
    setInputValue('')
    setLoader({status: false, value: ''})
  }

  const addToTail = async () => {
    const newList = new LinkedList<string>(list.toArray())
    let animationStates = [...new Array(list.toArray().length).fill(ElementStates.Default), ElementStates.Modified]; 
    const lastIndex = list.toArray().length - 1
    if (lastIndex < 0 ) return
    setButtonIsLock(true)
    setDelButtonIsLock(true)
    setIndexButtonIsLockAdd(true)
    setIndexButtonIsLockDel(true)
    setLoader({status: true, value: 't+'})
    setLowerAnimating({index: lastIndex, status: ElementStates.Changing, value: inputValue})
    await delay(500)
    newList.append(inputValue)
    setLowerAnimating(null)
    setList(newList)
    setAnimating(animationStates)
    await delay(500)
    setAnimating(null)
    setInputValue('')
    setLoader({status: false, value: ''})
  }

  const removeFromHead = async () => {
    const newList = new LinkedList<string>(list.toArray())
    const value = list.toArray()[0]
    setButtonIsLock(true)
    setDelButtonIsLock(true)
    setIndexButtonIsLockAdd(true)
    setIndexButtonIsLockDel(true)
    setLoader({status: true, value: 'h-'})
    setRemovbleValue(true)
    setLowerAnimating({index: 0, status: ElementStates.Changing, value: value})
    await delay(500)
    newList.deleteHead()
    setRemovbleValue(false)
    setLowerAnimating(null)
    setList(newList)
    setLoader({status: false, value: ''})
  }

  const removeFromTail = async () => {
    const newList = new LinkedList<string>(list.toArray())
    const lastIndex = list.toArray().length - 1
    const lastValue = list.toArray()[lastIndex]
    setButtonIsLock(true)
    setDelButtonIsLock(true)
    setIndexButtonIsLockAdd(true)
    setIndexButtonIsLockDel(true)
    setLoader({status: true, value: 't-'})
    setRemovbleValue(true)
    setLowerAnimating({index: lastIndex, status: ElementStates.Changing, value: lastValue})
    await delay(500)
    newList.deleteTail()
    setRemovbleValue(false)
    setLowerAnimating(null)
    setList(newList)
    setLoader({status: false, value: ''})
  }

  const addByIndex = async () => {
    if (typeof indexValue === 'number' && indexValue >= 0) {
      let animationState = new Array(list.toArray().length).fill(ElementStates.Default)
      const newList = new LinkedList<string>(list.toArray());
      setButtonIsLock(true)
      setDelButtonIsLock(true)
      setIndexButtonIsLockAdd(true)
      setIndexButtonIsLockDel(true)
      setLoader({status: true, value: 'i+'})
      for (let i = 0; i <= indexValue; i++) {
        if (i === indexValue) {
          animationState[i] = ElementStates.Modified;
        } else {
          animationState[i] = ElementStates.Changing;
        }
        setUpperAnimating({index: i, status: ElementStates.Changing, value: inputValue});
        setAnimating([...animationState]);
        await delay(500);
      }
      newList.addByIndex(inputValue, indexValue);
      setList(newList);
      setAnimating(null)
      setUpperAnimating(null)
      setInputValue('');
      setIndexValue('')
      setLoader({status: false, value: ''})
    } else {
      console.log("Индекс не определён");
    }
  }

  const deleteByIndex = async () => {
    if (typeof indexValue === 'number') {
      let animationState = new Array(list.toArray().length).fill(ElementStates.Default)
      const newList = new LinkedList<string>(list.toArray())
      const value = list.toArray()[indexValue]
      setButtonIsLock(true)
      setDelButtonIsLock(true)
      setIndexButtonIsLockAdd(true)
      setIndexButtonIsLockDel(true)
      setLoader({status: true, value: 'i-'})
      for (let i = 0; i <= indexValue; i++) {
        animationState[i] = ElementStates.Changing
        setAnimating([...animationState])
        await delay(500)
        if (i === indexValue) {
          setAnimating([...animationState])
          setLowerAnimating({index: indexValue, status: ElementStates.Changing, value: value})
          setRemovbleValue(true)
          await delay(500)
        }
      }
      newList.deleteByIndex(indexValue)
      setAnimating(null)
      setLowerAnimating(null)
      setList(newList)
      setLoader({status: false, value: ''})
    }
    else {
      console.log("Индекс не определён");
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={style.main}> 
        <Input type="text" maxLength={4} extraClass={style.input} isLimitText={true}
        value={inputValue} onChange={handleInputValue} data-testid="value"/>
        <Button type="button" text="Добавить в head" onClick={addToHead} disabled={buttonIsLock} isLoader={loader.status && loader.value === 'h+' ? true : false} data-testid="addHead"/>
        <Button type="button" text="Добавить в tail" onClick={addToTail} disabled={buttonIsLock} isLoader={loader.status && loader.value === 't+' ? true : false} data-testid="addTail"/>
        <Button type="button" text='Удалить из head' onClick={removeFromHead} disabled={delButtonIsLock} isLoader={loader.status && loader.value === 'h-' ? true : false} data-testid="deleteHead"/>
        <Button type="button" text="Удалить из tail"onClick={removeFromTail} disabled={delButtonIsLock} isLoader={loader.status && loader.value === 't-' ? true : false} data-testid="deleteTail"/>
      </div>
      <div className={style.main}>
        <Input type="number" extraClass={style.input} value={indexValue} onChange={handleIndexValue} data-testid="valueIndex"/>
        <Button type="button" text='Добавить по индексу' extraClass={style.button} onClick={addByIndex} 
        disabled={indexButtonIsLockAdd} 
        isLoader={loader.status && loader.value === 'i+' ? true : false} data-testid="addByIndex"/>
        <Button type="button" text="Удалить по индексу" extraClass={style.button} onClick={deleteByIndex}
        disabled={indexButtonIsLockDel} 
        isLoader={loader.status && loader.value === 'i-' ? true : false} data-testid="deleteByIndex"/>
      </div>
      <div className={style.second}>
      {elements.map((item, index) => (
        <div className={style.second} >
        <Circle letter={lowerAnimating && lowerAnimating.index === index && removebleValue ? '' : item.toString()} 
        key={index} index={index} 
        head={upperAnimating !== null 
          ? (upperAnimating.index === index 
              ? <Circle letter={upperAnimating.value} isSmall state={upperAnimating.status}/> 
              : null)
          : index === 0 ? 'Head' : null}
          tail={lowerAnimating !== null 
            ? (lowerAnimating.index === index 
                ? <Circle letter={lowerAnimating?.value} isSmall state={lowerAnimating.status}/> 
                : null)
            : index === elements.length - 1 ? 'Tail' : null}
        state={animating ? animating[index] : ElementStates.Default}/>
        {index < elements.length - 1 && <ArrowIcon />}
        </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
