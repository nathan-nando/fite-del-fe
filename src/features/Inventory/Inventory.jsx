import styles from "./index.module.css"
import {listLab} from "./data.js";
import {Badge, Button, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeSelectedInventory, changeSelectedLab, handlerForm, search} from "./slice.js";
import {useEffect} from "react";
import {fetchInventories} from "./thunk.js";
import {Loading} from "../../components/Loading/Loading.jsx";
import dateFormat from "dateformat";
import {ModalCustom} from "../../components/ModalCustom/ModalCustom.jsx";
import {hideModal, showModal} from "../Root/slice.js";
import {createLoan} from "../Peminjaman/thunk.js";

export const Inventory = () => {
    const state = useSelector((state) => state.inventoryState);
    const globalState = useSelector((state) => state.globalState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInventories())
    }, [dispatch]);

    const tableByMode = () => {
        return state.searchedInventory.map((value, index, array)=>{
            if (value.lab === listLab[state.selectedLab]) {
                return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>{value.dateIn.map((v) => {
                        return <li key={v} style={{listStyle: "none", display: "inline-block"}}><Badge
                            className={"pb-2 pt-2 ps-4 pe-4 me-2"} pill
                            bg={"success"}>{dateFormat(v, "yyyy")}</Badge></li>
                    })}</td>
                    <td>{value.total}</td>
                    <td>{value.frequency}</td>
                    <td><Button variant={"light"} style={{fontWeight: "bold"}} onClick={async () => {
                        await dispatch(changeSelectedInventory(array[index]))
                        dispatch(showModal())
                    }}><span className={"bi bi-bookmark-fill me-2"}></span> Meminjam</Button></td>
                </tr>
            }
        })


    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (globalState.modeModal === "create") {
            await dispatch(createLoan({
                personName: state.form.personName || "",
                personID: state.form.personID || "",
                borrowedFrom: state.form.borrowedFrom,
                dateLoan: state.form.dateLoan,
                dateReturn: state.form.dateReturn,
                status: "pending",
                inventory: state.selectedInventory._id,
            }));
        }
        dispatch(hideModal())
    }

    return <>
        <div className={"col-lg-8 text-center p-3 mx-auto"}>
            <Row>
                {listLab.map((value, index) => {

                    return <div onClick={() => {
                        dispatch(changeSelectedLab(index))
                    }} key={index}
                                className={`ms-5 shadow-sm border p-3 col ${styles.hoverLab} ${state.selectedLab === index ? styles.activeLab : ""}`}>Lab {value}</div>
                })}
            </Row>
        </div>
        <h5 className={"mt-5"}>Daftar Peralatan pada Laboratorium {listLab[state.selectedLab]}</h5>
        <div className={"text-center"}>
            {state.loading || globalState.loading ? <Loading/> :
                <>
                    <div className={"col-lg-3"}>
                        <InputGroup className="mb-3 mt-5">
                            <InputGroup.Text><i className={"bi bi-search"}></i></InputGroup.Text>
                            <FormControl
                                placeholder="Cari nama peralatan"
                                onChange={(e)=>{
                                    dispatch(search(e.target.value))
                                }}
                            />
                        </InputGroup>
                    </div>
                    <Table bordered className={"mt-4"}>
                        <thead>
                        <tr>
                            <th>Nomor</th>
                            <th>Nama Alat</th>
                            <th>Tahun Pengadaan</th>
                            <th>Jumlah</th>
                            <th>Banyak Peminjaman</th>
                            <th><span className={"bi bi-gear-fill"}></span></th>
                        </tr>
                        </thead>

                        <tbody>
                        {tableByMode()}
                        </tbody>
                    </Table>
                </>

            }

        </div>
        <ModalCustom modalTitle={`Peminjaman ${state.selectedInventory.name || ""}`} modalSize={"lg"}
                     onSubmit={handleSubmit}>
            <div className={"col-lg-12 mx-auto"}>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Nama Peminjam
                    </Form.Label>
                    <FormControl type={"text"} placeholder={"Masukkan nama"} onChange={(e) => {
                        dispatch(handlerForm({personName: e.target.value}));
                    }} value={state.form.personName}></FormControl>
                </Form.Group>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        NIM / NIK
                    </Form.Label>
                    <FormControl type={"text"} placeholder={"Masukkan NIM / NIK"} onChange={(e) => {
                        dispatch(handlerForm({personID: e.target.value}))
                    }} value={state.form.personID}></FormControl>
                </Form.Group>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Dipinjam dari
                    </Form.Label>
                    <FormControl type={"text"} placeholder={"Masukkan nama"} onChange={(e) => {
                        dispatch(handlerForm({borrowedFrom: e.target.value}))
                    }} value={state.form.borrowedFrom}></FormControl>
                </Form.Group>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Tanggal dipinjam
                    </Form.Label>
                    <FormControl type={"date"} onChange={(e) => {
                        dispatch(handlerForm({dateLoan: e.target.value}))
                    }} value={state.form.dateLoan}></FormControl>
                </Form.Group>
                <Form.Group className={"mb-3 ms-3"}>
                    <Form.Label style={{fontWeight: "bold"}}>
                        Tanggal dikembalikan
                    </Form.Label>
                    <FormControl type={"date"} onChange={(e) => {
                        dispatch(handlerForm({dateReturn: e.target.value}))
                    }} value={state.form.dateReturn}></FormControl>
                </Form.Group>
            </div>
        </ModalCustom>
    </>
}