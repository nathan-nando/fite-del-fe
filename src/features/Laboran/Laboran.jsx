import {useDispatch, useSelector} from "react-redux";
import {Login} from "../../components/Login/Login.jsx";
import {Button, Col, Row, Table} from "react-bootstrap";
import styles from "./style.module.css"
import {useEffect} from "react";
import {fetchLoans, updateLoan} from "../Peminjaman/thunk.js";
import {Loading} from "../../components/Loading/Loading.jsx";
import {changeSelectedLoan} from "../Peminjaman/slice.js";

export const Laboran = () => {
    const loanState = useSelector((state) => state.loanState);
    const globState = useSelector((state) => state.globalState);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoans())
    }, [dispatch]);
    const renderLogin = () => {
        const isLogin = localStorage.getItem('token') !== null
        console.log(isLogin)
        if (!isLogin) {
            return <div className={"col-lg-12 mx-auto"}>
                <Login/>
            </div>
        }
    }

    const handlerApprove = async (data) => {
        console.log(data)
        await dispatch(updateLoan({...data, status: "disetujui"}))
    }
    const handlerReject = async (data) => {
        await dispatch(updateLoan({...data, status: "ditolak"}))
    }

    const getLoan = () => {
        return loanState.searchedLoans.map((value, index, array) => {
            if (value.status === "menunggu") {
                return <tr key={index}>
                    <td>{value.personName}</td>
                    <td>{value.description}</td>
                    <td>{value.inventory.name}</td>
                    <td>{value.total}</td>
                    <td>
                        <Col className={"col-lg-6 mx-auto"}>
                            <Row>
                                <Col> <Button className={styles.btnCircle} variant={"outline-success"}
                                             onClick={()=>{handlerApprove(array[index])}} ><span
                                    className={"bi bi-check-circle-fill"}></span></Button></Col>
                                <Col> <Button className={styles.btnCircle} variant={"outline-danger"}
                                              onClick={()=>{handlerReject(array[index])}}><span
                                    className={"bi bi-check-circle-fill"}></span></Button></Col>
                            </Row>
                        </Col>
                    </td>
                </tr>
            }
        })
    }

    return <>

        {renderLogin()}
        {globState.isLogin ? <Col>
            <div className={"shadow-sm p-4 col-lg-3 border mb-5"}>
                <h5><span className={"bi bi-person-fill"}></span> Laboran</h5>
                <p>Nama : {localStorage.getItem("name")}</p>
            </div>
            <h5>Daftar alat yang akan dipinjam</h5>
            {loanState.loading ? <Loading></Loading> : <div className={"mt-5"}>

                <Table bordered>
                    <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Alat</th>
                        <th>Total</th>
                        <th><span className={"bi bi-gear-fill"}></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {getLoan()}
                    </tbody>
                </Table>

            </div>}
        </Col> : ""}

    </>
}