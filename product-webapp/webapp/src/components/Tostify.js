import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Tostify(props) {
    const valid = props ? true : false;

    const message = () => {
        if (props.type === 'success') {
            toast.success(props.message ? props.message : "working fine", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        else {
            toast.error(props.message ? props.message : "Something wrong please try again later!!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

    }

    return (
        <>

            {valid && message()}
            <ToastContainer
                theme='colored'
            />
        </>
    )
}