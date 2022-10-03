import { render, screen, fireEvent } from '../test-utils';
import MainScreen from '../MainScreen';
import AlbumEditScreen from '../screenComponents/AlbumEditScreen';

test('should render MainScreen component', () => {
    render(<MainScreen/>);
    const mainscreen = screen.getByTestId('mainscreen-1');
    expect(mainscreen).toBeInTheDocument();
}); 

//INTEGRATION TEST 

test('shoul render same text passed into album name prop')



