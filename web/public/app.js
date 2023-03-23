$('#navbar').load('navbar.html');
const API_URL = 'http://localhost:5000/api';
// const devices = JSON.parse(localStorage.getItem('devices')) || [];

$.get(`${API_URL}/devices`)
.then(response => {
  response.forEach(device => {
    $('#devices tbody').append(`
      <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});

$('#add-device').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  const sensorData = [];

  const body = {name: name, user: user, sensorData: sensorData};

  $.post(`${API_URL}/devices`, body)
  .then(response => {
    location.href = 'device-list.html';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});
