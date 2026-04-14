async function login(event){
  event.preventDefault();

  let form = event.target.elements;

  let data = {
    username: form['username'].value,
    password: form['password'].value
  };

  let result = await sendRequest('/login', 'POST', data);

  if (result.access_token){
    localStorage.setItem('access_token', result.access_token);
    window.location.href = "app.html";
  } else {
    toast("Login Failed");
  }
}

document.forms['loginForm'].addEventListener('submit', login);
