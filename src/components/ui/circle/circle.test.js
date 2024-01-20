import React from "react";
import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe ('<Circle/>', () => {

    it('renders correctly without text', () => {
        const {asFragment} = render(<Circle/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly whith text', () => { 
        const {asFragment} = render(<Circle letter="1"/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly whith head text', () => {
        const {asFragment} = render(<Circle head='1'/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with head element', () => {
        const element = <Circle letter="1"/>
        const {asFragment} = render(<Circle head={element}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with tail text', () => {
        const {asFragment} = render(<Circle tail='1'/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with tail element', () => {
        const element = <Circle letter="1"/>
        const {asFragment} = render(<Circle tail={element}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly with index', () => {
        const {asFragment} = render(<Circle index='1'/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly when is small', () => {
        const {asFragment} = render(<Circle isSmall={true}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly when state default', () => {
        const {asFragment} = render(<Circle state={ElementStates.Default}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly when state changing', () => {
        const {asFragment} = render(<Circle state={ElementStates.Changing}/>)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders correctly when state modifided', () => {
        const {asFragment} = render(<Circle state={ElementStates.Modified}/>)
        expect(asFragment()).toMatchSnapshot()
    })

})