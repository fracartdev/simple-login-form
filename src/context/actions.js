const ROOT_URL = 'localhost';
 
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch("https://graphqlzero.almansi.me/api", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify({
            query: `{
                user(id: 1) {
                    id
                    name
                }
            }`
        })
      });
    let data = await response.json();
 
    if (data.data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.data });
      localStorage.setItem('currentUser', JSON.stringify(data.data));
      return data.data
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}