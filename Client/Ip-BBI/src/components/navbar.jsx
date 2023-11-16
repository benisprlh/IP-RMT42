import { Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-dark shadow" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand">BBI</a>
          <div className="d-flex">
            <button className="btn btn-outline-warning" type="submit">
              Login
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
