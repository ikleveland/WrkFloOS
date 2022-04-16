
let form = document.getElementById('sms-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target);
  let sms = e.target.sms.value;

  let body = {
      lead_id: 1,
        sms: sms,
  }

  fetch('/api/sendsms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).then(data => {
    console.log(data)
    if (data.error) {
      let errors = data.error.map((error) => {
        return `<p>${error}</p>`
      })

      document.getElementById('errors').innerHTML = errors

    }
  })
})

