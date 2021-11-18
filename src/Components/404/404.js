import { Link } from "react-router-dom";

export default function pageNotFound () {
    return(
        <div className='page-not-found'>
            <h2>404 - Page Not Found</h2>
            <Link to='/Home'>
                <button>Back to Home Page</button>
            </Link>
        </div>
    )
}