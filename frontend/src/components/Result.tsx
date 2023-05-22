import React from "react";
import {Link, useLocation} from "react-router-dom";
import '../index.css'
import {ReactComponent as Arrow} from "../static/arrow.svg";
import {ReactComponent as Download} from "../static/download-svgrepo-com.svg";

const Result = () => {
    const {result, href} = useLocation().state


    return (
        <div className="container">
            <div className="form">
                <div className="result">
                    <h1 style={{margin: 0}}>Ваш результат:</h1>
                    <h2 style={{margin: 0}}><i>{result || ''}</i></h2>
                </div>
                <div className="actions">
                    <Link to={'/'} className={"link back_link"}>
                        <Arrow height={20}/>
                        <p style={{margin: 0, color: 'white'}}>Вернуться на главную</p>
                    </Link>
                    {!!href && <a className={"link download_link"} href={href} target={'_blank'} rel={'noreferrer'}>
                        <Download height={20}/>
                        <p style={{margin: 0, color: 'black'}}>Скачать результат</p>
                    </a>}
                </div>
            </div>
        </div>
    )
}

export default Result