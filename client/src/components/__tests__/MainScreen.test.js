import { render, screen } from '../test-utils';
import MainScreen from '../MainScreen';


test('should render MainScreen component', () => {
    render(<MainScreen />);
    const mainscreen = screen.getByTestId('mainscreen-1');
    expect(mainscreen).toBeInTheDocument();
});




