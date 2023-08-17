import {Button, Form, InputGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../features/Root/thunk.js";
import {Loading} from "../Loading/Loading.jsx";


export const Login = () => {
    const globState = useSelector((state) => state.globalState);
    const dispatch = useDispatch();
    let username;
    let password;

    const handlerSubmit = (e) => {
        e.preventDefault();

        dispatch(login({
            username: username,
            password: password
        }))

    }
    return <div className={"col-lg-6 mx-auto text-center mt-5"}>
        <div className={"shadow-sm border p-5"} style={{height: "39vh"}}>
            <h5>Silahkan Login</h5>
            <div className={"col-lg-10 mx-auto"}>
                <Form className={"mt-5"} onSubmit={e => handlerSubmit(e)}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><span className={"bi bi-person-fill"}></span></InputGroup.Text>
                        <Form.Control
                            placeholder="Masukkan username" onChange={e => {
                            username = e.target.value
                        }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 mt-4">
                        <InputGroup.Text><span className={"bi bi-key-fill"}></span></InputGroup.Text>
                        <Form.Control
                            placeholder="Masukkan password" onChange={e => {
                            password = e.target.value
                        }}
                        />
                    </InputGroup>
                    {Object.keys(globState.error).length !== 0 ? <p className={"text-danger"}>username / password salah</p>: <></>}
                    {globState.loading ? <Loading  width={100} height={100}/> :  <Button type={"submit"} className={"mt-4"} style={{width: "10vw"}}>Login</Button>}

                </Form>
            </div>
        </div>
    </div>
}