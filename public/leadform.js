console.log('hello world')

let form = document.getElementById('lead-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target);
  let firstName = e.target.firstName.value;
  let phoneNumber = e.target.phoneNumber.value;
  let lastName = e.target.lastName.value;
    let email = e.target.email.value;
  

  let body = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email
  }

  fetch('/api/lead/input', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).then(data => {
    console.log(data)

    location.href = "/dashboard";
  })
})