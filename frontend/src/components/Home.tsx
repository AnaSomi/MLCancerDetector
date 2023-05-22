import '../index.css'
import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {ReactComponent as Upload} from "../static/upload-file-svgrepo-com.svg";
import Loader from "./Loader";

const Home = () => {
    const nav = useNavigate()
    const [file, setFile] = useState<File | null>(null)
    const [model, setModel] = useState<string>('CatBoost')
    const [isLoading, setIsLoading] = useState(false)

    const onUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]?.type !== 'text/plain' &&
            event.target.files?.[0]?.type !== 'application/x-zip-compressed' &&
            event.target.files?.[0]?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
            event.target.files?.[0]?.type !== 'text/csv'
        ) {
            return
        }
        setFile(event.target.files?.[0] || null)
    }

    const onDeleteFile = () => {
        setFile(null)
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!file || !model) {
            alert('Необходимо загрузить файл')
            return
        }
        try {
            setIsLoading(true)
            const body = new FormData()
            body.append('file', file)
            body.append('type', model)
            const response = await fetch('http://158.160.23.158', {
                method: 'POST',
                body: body
            })

            if (!response.ok) {
                throw new Error('Ошибка')
            }

            const data = await response.json()

            nav('/result', {
                state: {
                    result: data.result,
                    href: data.href
                }
            })
        } catch (e) {
            console.warn('Ошибка')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
            <h1>Анализ клеток на наличие рака </h1>
            <form onSubmit={onSubmit} className="form">
                <div className="upload">
                    <label className="upload_label">
                        <Upload width={20}/>
                        {file ? 'Заменить' : 'Загрузить файл'}
                        <input style={{display: 'none'}} type={'file'} accept={'.txt,.zip,.csv,.xlsx'} onChange={onUploadFile}/>
                    </label>
                    {file &&
                        <div style={{display: 'flex', gap: 5}}>
                            <p className="filename" style={{margin: 0}}>{file.name.slice(0, 10) + (file.name.length > 10 ? '...' : '')}</p>
                            <p style={{margin: 0, cursor: 'pointer'}} onClick={onDeleteFile}>&times;</p>
                        </div>
                    }
                </div>
                <div className="model">
                    <h4>Выберите модель:</h4>
                    <label>
                        <input type={'radio'} value={'CatBoost'} checked={model === 'CatBoost'} name={'model'}
                               onChange={(e) => setModel(e.target.value)}/>
                        CatBoost
                    </label>
                    <label>
                        <input type={'radio'} value={'CNN'} checked={model === 'CNN'} name={'model'}
                               onChange={(e) => setModel(e.target.value)}/>
                        CNN
                    </label>
                    <label>
                        <input type={'radio'} value={'LGBM'} checked={model === 'LGBM'} name={'model'}
                               onChange={(e) => setModel(e.target.value)}/>
                        LGBM
                    </label>
                </div>
                {isLoading ? <Loader/> : <button type={'submit'}>Отправить</button>}
            </form>
        </div>
    )
}

export default Home