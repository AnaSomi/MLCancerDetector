import {useState} from "react";
import '../index.css'


const Instruction = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <div className="burger" onClick={() => setOpen(prevState => !prevState)}>
                <div className={"line" + (open ? " open" : "")}/>
                <div className={"line" + (open ? " open" : "")}/>
            </div>
            <div className={"layout" + (open ? " blackout" : "")}/>
            <div className={"menu" + (open ? " open" : "")}>
                <h4>Как это работает?</h4>
                <ol className="instruction">
                    <li> Загрузите свой анализ в виде файла в формате txt, csv. Также можно загрузить zip архив, содержащий файлы txt. В файле txt должно быть записано одно исследование. </li>
                    <li> Файл должен содержать данные о волновом числе, интенсивности. </li>
                    <li> Ваш файл должен содержать рамановский диапозон 2200-3600. К сожаления другой диапозон не поддерживается</li>
                    <li> Опционально Вы можете выбрать тип модели </li>
                    <li> Нажмите кнопку "Отправить" </li>
                </ol>
            </div>
        </>
    )
}

export default Instruction