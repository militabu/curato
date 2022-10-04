import { render, screen, fireEvent } from '../test-utils';
import ContactsScreen from '../screenComponents/ContactsScreen';

const mockedSetTodo = jest.fn()

describe('SearchContacts', () => {

    test('should render same text passed into header', async () => {
        render(<ContactsScreen />);
        const headingElement = screen.getByText(/my contacts/i)
        expect(headingElement).toBeInTheDocument();
    })

    test('should render input element', async () => {
        render(<ContactsScreen
            searchState={[]}
            //for the hook it is best to mock it, just an empty function because we do not care about the outcome
            setSearchState={mockedSetTodo}
        />);
        const inputElement = screen.getByPlaceholderText(/Search Contacts.../i)
        expect(inputElement).toBeInTheDocument();
    });

    test('should be able to type into input', async () => {
        render(<ContactsScreen
            searchState={[]}
            //for the hook it is best to mock it, just an empty function because we do not care about the outcome
            setSearchState={mockedSetTodo}
        />);
        const inputElement = screen.getByPlaceholderText(/Search Contacts.../i)
        //fire event
        fireEvent.change(inputElement, { target: { value: 'Francis Hui' } })
        expect(inputElement.value).toBe('Francis Hui')
    });

})