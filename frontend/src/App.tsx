import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Instruction from "./components/Instruction";

function App() {
    return (
        <BrowserRouter>
            <Instruction/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
