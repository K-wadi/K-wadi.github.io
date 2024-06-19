// Selecteert het formulierelement met de klasse 'contact-form' en voegt een 'submit'-eventlistener toe.
document.querySelector('.contact-form').addEventListener('submit', function (event) {
  // Voorkomt de standaardactie van het event, wat in dit geval het verzenden van het formulier is.
  event.preventDefault();

  // Houd bij of alle velden van het formulier geldig zijn.
  let isValid = true;

  // Declareert een functie om een enkel veld te valideren.
  function validateField(field) {
    // Definieert een reguliere expressie voor verboden karakters die niet toegestaan zijn in de invoervelden.
    const forbiddenChars = /[\*&\$#!]/;
    // Definieert een reguliere expressie voor bepaalde scheldwoorden.
    const swearWordsPattern = /je moeder|kanker|hoer/i;

    // Zoekt naar een volgend element dat een foutmelding kan zijn en verwijdert deze als die bestaat.
    let errorMessageElement = field.nextElementSibling;
    if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
      field.parentNode.removeChild(errorMessageElement);
    }

    // Controleert het veld op verboden karakters of scheldwoorden. Toont een foutmelding als deze gevonden worden.
    if (forbiddenChars.test(field.value) || swearWordsPattern.test(field.value)) {
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Ongeldige invoer gedetecteerd.';
      field.parentNode.insertBefore(errorMessage, field.nextSibling);
      field.classList.add('invalid-input');
      isValid = false; // Update de validatiestatus naar ongeldig.
    } else {
      // Verwijdert de markering voor ongeldige invoer als de controle slaagt.
      field.classList.remove('invalid-input');
    }
  }

  // Roept de validateField functie op voor elk van de gespecificeerde velden.
  validateField(document.querySelector('#name'));
  validateField(document.querySelector('#email'));
  validateField(document.querySelector('#description'));

  // Controleert of alle invoer geldig is en voert acties uit op basis van die validatie.
  if (isValid) {
    // Verbergt het formulier en toont een bedankbericht als alle invoer geldig is.
    document.querySelector('.contact-form').style.display = 'none';
    document.querySelector('.thank-you-message').style.display = 'block';
  }
});

