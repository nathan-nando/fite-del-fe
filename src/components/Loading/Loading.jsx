import {Image} from "react-bootstrap";
import loading from "../../assets/img/loading.gif"

export const Loading = ({width = 300, height = 300}) =>{
    return <Image src={loading} width={width} height={height}/>
}