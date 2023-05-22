import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Result from "./Result";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/result'} element={<Result/>}/>
            <Route path={'*'} element={<Home/>}/>
        </Routes>
    )
}

export default AppRouter