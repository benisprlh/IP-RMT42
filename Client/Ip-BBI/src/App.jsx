import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import TeamProvider from './state/teams';
import router from './router/route';
function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="264973295117-ge66j02dce44pq4b4imc77rgm9t0cp26.apps.googleusercontent.com">
        <TeamProvider>
          <RouterProvider router={router} />
        </TeamProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
