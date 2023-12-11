import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import style from "./sorting-page.module.css"
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const BUBBLE = 'bubble'
  const SELECTION = 'selection'
  const INITIAL = ElementStates.Default;
  const COMPARING = ElementStates.Changing;
  const SORTED = ElementStates.Modified;
  const [arr, setArr] = React.useState<{value: number, status: ElementStates}[]>([])
  const [inputValue, setInputValue] = React.useState<string>(SELECTION)
  const [isSorting, setIsSorting] = React.useState<boolean>(false)
  const [buttonIsActive, setButtonISActive] = React.useState<boolean>(true)
  const [loaderAscending, setLoaderAscending] = React.useState<boolean>(false)
  const [loaderDescending, setLoaderDescending] = React.useState<boolean>(false)


async function bubbleSortReverse(arr:  {value: number, status: ElementStates}[]): Promise<void> {
  let n = arr.length
  setButtonISActive(false)
  setLoaderDescending(true)
  for (let i = 0; i < n -1; i++) {
    for (let j =0; j < n - i - 1; j++) {
      arr[j].status = COMPARING
      arr[j + 1].status = COMPARING

      setArr([...arr])
      await sleep(1000)

      if (arr[j].value < arr[j + 1].value) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
      arr[j].status = INITIAL;
      arr[j + 1].status = INITIAL;

      setArr([...arr])
      await sleep(1000)
    }
    arr[n - i - 1].status = SORTED;
  }  
  arr[0].status = SORTED;
  setArr([...arr]);
  setButtonISActive(true)
  setLoaderDescending(false)
}  
  
 async function bubbleSort(arr:  {value: number, status: ElementStates}[]): Promise<void> {
    setButtonISActive(false)
    setLoaderAscending(true)
    let n = arr.length
    for (let i = 0; i < n -1; i++) {
      for (let j =0; j < n - i - 1; j++) {
        arr[j].status = COMPARING
        arr[j + 1].status = COMPARING

        setArr([...arr])
        await sleep(1000)

        if (arr[j].value > arr[j + 1].value) {
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
        arr[j].status = INITIAL;
        arr[j + 1].status = INITIAL;

        setArr([...arr])
        await sleep(1000)
      }
      arr[n - i - 1].status = SORTED;
    }  
    arr[0].status = SORTED;
    setArr([...arr]);
    setButtonISActive(true)
    setLoaderAscending(false)
  }

async function selectionSortReverse(arr: {value: number, status: ElementStates}[]) : Promise<void> {
  setButtonISActive(false)
  setLoaderDescending(true)
  let n = arr.length;
  for (let i = 0; i < n; i++) {
      let minIndex = i;
      arr[minIndex].status = COMPARING;

      for (let j = i + 1; j < n; j++) {
          arr[j].status = COMPARING;
          setArr([...arr]);
          await sleep(1000);

          arr[j].status = INITIAL;
          if (arr[j].value > arr[minIndex].value) {
              arr[minIndex].status = INITIAL;
              minIndex = j;
              arr[minIndex].status = COMPARING;
          }
          setArr([...arr]);
      }

      arr[minIndex].status = INITIAL;

      if (minIndex != i) {
          let temp = arr[i];
          arr[i] = arr[minIndex];
          arr[minIndex] = temp;
      }

      arr[i].status = SORTED;
      setArr([...arr]);
      await sleep(1000);
  } 
  arr.forEach(element => element.status = INITIAL);
  setArr([...arr]);
  setButtonISActive(true)
  setLoaderDescending(false)
  }

  async function selectionSort(arr: { value: number, status: ElementStates }[]): Promise<void> {
    setButtonISActive(false)
    setLoaderAscending(true)
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIndex = i;
        arr[minIndex].status = COMPARING;

        for (let j = i + 1; j < n; j++) {
            arr[j].status = COMPARING;
            setArr([...arr]);
            await sleep(1000);

            arr[j].status = INITIAL;
            if (arr[j].value < arr[minIndex].value) {
                arr[minIndex].status = INITIAL;
                minIndex = j;
                arr[minIndex].status = COMPARING;
            }
            setArr([...arr]);
        }

        arr[minIndex].status = INITIAL;

        if (minIndex != i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        arr[i].status = SORTED;
        setArr([...arr]);
        await sleep(1000);
    } 
    arr.forEach(element => element.status = INITIAL);
    setArr([...arr]);
    setButtonISActive(true)
    setLoaderAscending(false)
}


  function randomArray() : {value: number, status: ElementStates}[] {
    const minLength = 3
    const maxLength = 17
    const min = 0
    const max = 100
    const size = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    return Array.from({length: size}, () => ({value: Math.floor(Math.random() * (max - min + 1) + min), status: INITIAL}))
  }

  React.useEffect(() => {
    const newArr = randomArray()
    setArr(newArr)
  }, [])

  function newArray() {
    setIsSorting(false)
    console.log(isSorting)
    const arr = randomArray()
    setArr(arr)
  }

  function ascendingSort() {

    if (inputValue === BUBBLE) {
      console.log(inputValue)
      bubbleSort(arr)
    }
    if(inputValue === SELECTION) {
      console.log(inputValue)
      selectionSort(arr)
    }

    setArr(arr)
  }

  function descendingSort() {

    if (inputValue === BUBBLE) {
      console.log(inputValue)
      bubbleSortReverse(arr)
    }

    if(inputValue === SELECTION) {
      console.log(inputValue)
      selectionSortReverse(arr)
    }

    setArr(arr)
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.main}>
        <div className={style.radio}>
          <RadioInput label="Выбор" name='g1' onChange={() => setInputValue(SELECTION)} checked={inputValue === SELECTION}/>
          <RadioInput label="Пузырек" name='g1' onChange={() => setInputValue(BUBBLE)} checked={inputValue === BUBBLE}/> 
        </div>
        <div className={style.submit}>
            <Button sorting={Direction.Ascending} text="По возростанию" type='button' onClick={() => ascendingSort()} disabled={!buttonIsActive} isLoader={loaderAscending}/>
            <Button sorting={Direction.Descending} text="По убыванию" type="button" onClick={() => descendingSort()} disabled={!buttonIsActive} isLoader={loaderDescending}/>
        </div>
        <Button type="reset"  text="Новый массив" onClick={newArray} disabled={!buttonIsActive}/>
      </form>
      <div className={style.stats}>
        {arr.map((n, index) => (
          <Column key={index} index={n.value} state={n.status}/>
        ))}
      </div>
       
    </SolutionLayout>
  );
};
