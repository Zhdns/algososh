import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Button } from "./button";
import { Direction } from "../../../types/direction";


describe('<Button/>', () => {
    afterEach(cleanup)

    it('renders correctly with text', () => {
        const {asFragment} = render(<Button text="Test Button"/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders without text', () => {
        const {asFragment} = render(<Button/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders with loader', () => {
        const {asFragment} = render(<Button isLoader={true}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders with icon', () => {
        const {asFragment} = render(<Button sorting={Direction.Ascending}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders when disabled', () => {
        const {asFragment} = render(<Button disabled={true}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it('calls callback function on click', () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button text="Clickable Button" onClick={onClick} />);
      
        fireEvent.click(getByText('Clickable Button'));
        expect(onClick).toHaveBeenCalled();
      });
      


})