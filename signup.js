async function signup(event){
  event.preventDefault();

  let form = event.target.elements;

  let data = {
    username: form['username'].value,
    email: form['email'].value,
    password: form['password'].value
  };

  let result = await sendRequest('/signup', 'POST', data);

  if ('detail' in result){
    toast("Register Failed");
  } else {
    toast("Register Successful");
    window.location.href = "index.html";
  }
}

document.forms['signUpForm'].addEventListener('submit', signup);
