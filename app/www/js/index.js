const magic = new Magic('pk_live_EDF5013AF4526241');

$(document).ready(function () {
  $('#login').on('submit', async function (e) {
    $('*', '#login').prop('disabled', true); // disable form

    e.preventDefault();
    let email = $('.email').val();

    if (email.includes('@')) {
      const DID = await magic.auth.loginWithMagicLink({ email });

      const resp = await fetch('http://localhost:3000/login?token=' + DID);
      const { access_token } = await resp.json();

      console.log(access_token);

      // save token to local storage
      localStorage.setItem('access_token', access_token);

      window.location.href = './pages/home.html'

      //alert(access_token);
    }

    $('*', '#login').prop('disabled', false); // enable form
  });
});