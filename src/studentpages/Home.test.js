import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe('Home Component', () => {
    test('render Welcome to Learning Management System', async () => {
        //Arrange
        render(<Home />)
        //Act
    
        //Assert
        const welcome = await screen.findByText('Welcome to Learning Management System');
        expect(welcome).toBeInTheDocument();
    })

    test('render Loading', () => {
        //Arrange
        render(<Home />)
        //Act
    
        //Assert
        const loading = screen.getByText('A moment please...');
        expect(loading).toBeInTheDocument();
    })
})