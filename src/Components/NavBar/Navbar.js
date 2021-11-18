import { Link } from 'react-router-dom';

function handleLogout () {
    sessionStorage.clear();
    window.location.href = '/'
}

function Navbar () {

    return (
        <div className="navbar">
            <h1>My Manager</h1>
            <div className='links'>
                <Link to='/home'>Home</Link>
                <Link to='/admins'>Admin</Link>
                <Link to='/organizations'>Organization</Link>
                <Link to='/users'>User</Link>
                <Link to='/activities'>Activity</Link>
                <Link to='/details'>Detail</Link>
                <Link to='/cards'>Card</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;