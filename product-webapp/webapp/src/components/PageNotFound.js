import {BiError} from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <>

            <div className='container mt-5'>
                <div className='text-secondary display-1  text-center'><BiError size={300} style={{ opacity: "0.5" }} /></div>
                <h1 className='text-secondary display-1 text-center'>OOPs!!!</h1>
                <p className='text-secondary display-6  text-center'>Page not found</p>
                <p className='text-secondary fs-3 text-center'>Go to <Link to="/" className='text-secondary fs-3'>Home</Link></p>
            </div>
        </>
    )
}