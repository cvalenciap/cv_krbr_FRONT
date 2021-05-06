(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.backend_path = 'http://localhost:59262/Kerbero.svc/';
  // Google reCAPTCHA site key
  window.__env.recaptcha_site_key = '6Ld6x0sUAAAAADnPi9notQAR-TubaFdXx7Fi2Rgi';
  console.log(window.__env.backend_path);

  // Mensajes
  window.__env.help_messages = {
      hello_message: "Bienvenido"
  };

}(this));