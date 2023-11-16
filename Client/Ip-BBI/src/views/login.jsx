import axios from 'axios';
import { useEffect, useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    console.log(BaseUrl + 'login/all');
    try {
      const { data } = await axios.post(BaseUrl + 'users/login', { email, password });
      localStorage.setItem('access_token', data.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  function handleEmail(e) {
    console.log(e.target.value);
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    console.log(e.target.value);

    setPassword(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await login();
    navigate('/home');
  }

  async function handleCredentialResponse(response) {
    try {
      const { data } = await axios.post(BaseUrl + 'users/auth/google', null, {
        headers: {
          g_token: response.credential,
        },
      });
      localStorage.setItem('access_token', data.access_token);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '264973295117-ge66j02dce44pq4b4imc77rgm9t0cp26.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'Medium' } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  function handleRegister(e) {
    e.preventDefault();
    navigate('/register');
  }

  return (
    <section className="bg-img" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/basketball-arena-with-basketball-ball-ai-generation_201606-5316.jpg')`, backgroundSize: 'cover' }}>
      <div className="container  vh-100 w-75 d-flex align-items-center justify-content-center">
        <div className="w-50 h-auto bg-dark p-3 rounded text-white shadow-lg">
          <h4 className="text-center fw-bold text-warning">WELCOME TO BBI</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example3" name="email">
                Email
              </label>
              <input type="text" id="form3Example3" className="form-control" name="email" onChange={handleEmail} />
              <label className="form-label" htmlFor="form3Example4" name="password">
                Password
              </label>
              <input type="password" id="form3Example4" className="form-control" name="password" onChange={handlePassword} />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-warning btn-block mb-4">
                Login
              </button>
            </div>
            <div id="buttonDiv" className="m-auto"></div>
            <div className="text-center my-4">
              <h7>
                Don&apos;t have an account?{' '}
                <a href="" onClick={handleRegister}>
                  Register here
                </a>
              </h7>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
