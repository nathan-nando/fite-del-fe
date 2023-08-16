import styles from "./index.module.css"
import {listLab} from "./data.js";
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeSelectedLab} from "./slice.js";

export const Inventory = () => {
    const state = useSelector((state) => state.inventoryState);
    const dispatch = useDispatch();

    return <>
        <div className={"col-lg-8 text-center p-3 mx-auto"}>
            <Row>
                {listLab.map((value, index) => {

                    return <div onClick={() => {
                        dispatch(changeSelectedLab(index))
                    }} key={index} className={`ms-5 shadow-sm border p-3 col ${styles.hoverLab} ${state.selectedLab === index ? styles.activeLab : ""}`}>Lab {value}</div>
                })}
            </Row>
        </div>
        <h5 className={"mt-3"}>Daftar Peralatan pada Laboratorium {listLab[state.selectedLab]}</h5>
    </>
}