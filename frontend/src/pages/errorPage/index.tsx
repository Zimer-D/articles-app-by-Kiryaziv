import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate()
    return ( 
        <>
        <h1>No such page</h1>
        <div onClick={()=>navigate('/')}>Back to articles</div>
        </>
     );
}
 
export default Error404;