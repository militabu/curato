import { render, screen } from '../test-utils';
import Navbar from '../Navbar';
import AlbumListScreen from '../screenComponents/AlbumListScreen'
import Footermenu from '../FooterMenu'




test('should render Navbar component', () => {
    render(<Navbar/>);
    const navbarElement = screen.getByTestId('navbar-1');
    expect(navbarElement).toBeInTheDocument();
}); 


test('should show the navbar icons when website is loaded', () =>{
    render(<Footermenu />);
    const albumElement = screen.getByTestId('album-element');
    expect(albumElement).toBeInTheDocument();
})

test('should display the correct label on footer navbar', () =>{
    render(<Footermenu />);
    
   
})

test('clicked album icon should change its color', () =>{
    render(<Footermenu />);
})

test('when friends icon is clicked, should show the input bar', () =>{
    render(<Footermenu />);

})


test('should render Album List Screen component', () => {
    render(<AlbumListScreen/>);
    const albumsListScreen = screen.getByTestId('albumsListScreen-1');
    expect(albumsListScreen).toBeInTheDocument();
}); 


/* 
TEST IDEA FOR ANOTHER COMPONENT

test('should render same text pased into title')
render name of component 
const ... = screen.getbytext(/my contacts/i);
expect(...).toBeInTheDocument();


*/