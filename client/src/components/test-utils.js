import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider} from 'react-redux'
import reducer from '../redux/reducers'

function render(
    ui, 
    {
        preloadedState,
        store = configureStore({reducer: reducer, preloadedState }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }){
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

//re-exporting everything
export * from '@testing-library/react'
//overrive render method
export {render}