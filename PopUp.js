// Configurações do Pop-up

const popUpId = "#e_0000000000"; // ID do elemento pop-up
const enablePopupOnExit = true; // False desabilita o popup ao sair com o mouse
const enablePopupByTime = true; // False desabilita o popup por tempo
const tempo_abrir = 5; // Tempo em segundos para abrir o pop-up
const days = 0; // Dias para o pop up abrir novamente
const hours = 0; // Horas para o pop up abrir novamente
const minutes = 0; // Minutos para o pop up abrir novamente
const seconds = 5; // Segundos para o pop up abrir novamente

// Função AbrirPopUp
window.AbrirPopUp = function (id_elemento) {
  if (document.cookie.indexOf("gpages_popup_leave") == -1) {
    var data = new Date(),
      data_limite = new Date();

    const MILLISECONDS_PER_SECOND = 1000;
    const SECONDS_PER_MINUTE = 60;
    const MINUTES_PER_HOUR = 60;
    const HOURS_PER_DAY = 24;

    // Cálculo do tempo a ser adicionado à data limite do cookie
    const millisecondsToAdd =
      days *
        HOURS_PER_DAY *
        MINUTES_PER_HOUR *
        SECONDS_PER_MINUTE *
        MILLISECONDS_PER_SECOND +
      hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND +
      minutes * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND +
      seconds * MILLISECONDS_PER_SECOND;

    data_limite.setTime(data_limite.getTime() + millisecondsToAdd);

    // Criação do cookie 'gpages_popup_leave' com a data atual e a data limite.
    document.cookie =
      "gpages_popup_leave=" +
      data.getFullYear() +
      "-" +
      (data.getMonth() + 1) +
      "-" +
      data.getDate() +
      "T" +
      data.getHours() +
      ":" +
      data.getMinutes() +
      ":" +
      data.getSeconds() +
      "; Expires=" +
      data_limite.toGMTString() +
      "; Path=/;";
    $(id_elemento).trigger("click");
  }
};

// Função para abrir o pop-up após um tempo definido
function AbrirPopUpComTempo(id_elemento, tempo) {
  setTimeout(function () {
    AbrirPopUp(id_elemento);
  }, tempo * 1000); // Convertendo para milissegundos
}

// Adiciona ".c" ao ID do pop-up
const popUpIdComC = popUpId + " .c";

// Abre o pop-up após o tempo definido
if (enablePopupByTime) {
  AbrirPopUpComTempo(popUpIdComC, tempo_abrir);
}

// Monitora o evento de saída do cursor do mouse da página.
if (enablePopupOnExit) {
  $(document).on("mouseleave", function (e) {
    // Verifica se o cursor do mouse saiu da parte superior da página e se não há pop-up aberto.
    if (e.clientY <= 0 && !$(".gpc_modal-fundo").length) {
      AbrirPopUp(popUpIdComC);
    }
  });
}

// Verifica se a largura da janela é menor ou igual a 800 pixels.
if ($(window).width() <= 800) {
  var intervalo_popup;
  // Variável que armazena o tempo decorrido
  var tempo = 0;
  // Variável que define o tempo necessário para abrir o pop-up.
  const tempo_abrir_largura_pequena = 5;
  // Define um intervalo para chamar a função `MostrarBlocos` a cada segundo.
  intervalo_popup = setInterval(function () {
    MostrarBlocos(popUpIdComC);
  }, 1000);

  // Define a função `MostrarBlocos`, que recebe o botão de pop-up como parâmetro.
  function MostrarBlocos(id_elemento) {
    tempo++;
    // Se o tempo decorrido for maior ou igual ao tempo necessário para abrir o pop-up...
    if (tempo >= tempo_abrir_largura_pequena) {
      // Chama a função `AbrirPopUp` passando o botão de pop-up como parâmetro.
      AbrirPopUp(id_elemento);
      tempo = null;
      // Limpa o intervalo para interromper a chamada da função.
      clearInterval(intervalo_popup);
    }
  }
}
