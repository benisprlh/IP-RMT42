import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseUrl from '../helpers/baseurl';
import { useState } from 'react';

export const Navbar = ({ button }) => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  function handleButton() {
    localStorage.removeItem('access_token');
    navigate('/login');
  }

  async function handleUpgrade() {
    try {
      const { data } = await axios.get(BaseUrl + `users/payment/midtrans/token`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      window.snap.pay(data.transaction_token, {
        onSuccess: async function () {
          const form = { orderId: data.orderId };

          await axios.patch(BaseUrl + `users/me/upgrade`, form, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert('wating your payment!');
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert('payment failed!');
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert('you closed the popup without finishing the payment');
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="navbar bg-dark shadow" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand">BBI</a>
          <div className="d-flex">
            <button className="btn btn-success mx-3" onClick={handleUpgrade}>
              Upgrade your acc
            </button>
            <button className="btn btn-warning" type="submit" onClick={handleButton}>
              {button}
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
