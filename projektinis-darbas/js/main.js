$(document).ready(function() {
  $('#submit-btn').click(function() {
    var inputs = $('.php-email-form input');

    var allValid = true;
    inputs.each(function() {
      var input = $(this);
      var errorText = input.data('error');
      if (input.val() === '') {
        allValid = false;
        showError(input, errorText);
      } else if (input.attr('type') === 'email' && !isValidEmail(input.val())) {
        allValid = false;
        showError(input, errorText);
      } else {
        hideError(input);
      }
    });

    if (allValid) {
      inputs.val('');

      $('#message').css('color', 'green').text('Sėkmingai pateikta. Per 1 dieną Jums atsiųsime komercinį pasiūlymą ir priskirsime didmenines kainas.').fadeIn('slow');
    } else {
      $('#message').css('color', '#dc3545').text('Pasitikrinkite užpildytus laukelius.').fadeIn('slow');
    }
  });
});

let invalidFields = {};

function showError(input, message) {
  if (!invalidFields[input.attr('id')]) {
    input.after(`<div class="invalid-feedback">${message}</div>`);
    invalidFields[input.attr('id')] = true;
  }
  input.addClass('is-invalid');
}

function hideError(input) {
  if (invalidFields[input.attr('id')]) {
    input.next('.invalid-feedback').remove();
    input.removeClass('is-invalid');
    invalidFields[input.attr('id')] = false;
  }
}

function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


function addAddressField() {
  const addressGroup = document.getElementById('address-group');

  const newField = `
    <div class="form-group col-md-6">
      <label for="inputAddress2">Papildomas adresas</label>
      <input type="text" class="form-control" id="inputAddress2" name="address2" placeholder="" data-error="Įveskite papildoma parduotuvės adresą arba ištrinkite" required>
       <div class="invalid-feedback"></div>
        <button type="button" class="istrinti-adresa" onclick="removeAddressField(this)"><img src="img/circle-remove.svg" alt="circle-add-icon" id="add-address"><span class="icon-text">Ištrinti papildoma adresą</span></button>
    </div>
  `; 
  addressGroup.insertAdjacentHTML('afterend', newField);
}

function removeAddressField(field) {
  field.parentNode.remove();
}


$(window).on('scroll', function () {
  var navHeight = $('#main-nav').height();
  var topOffset = $('#kodel-renkasi').offset().top - navHeight;
  if ($(window).scrollTop() > topOffset) {
    $('#main-nav').addClass('fixed-top');
  } else {
    $('#main-nav').removeClass('fixed-top');
  }
});

function showFileNames() {
  const input = document.getElementById('chooseFile');
  const output = document.getElementById('fileNames');
  const files = input.files;
  let fileNames = '';
  for (let i = 0; i < files.length; i++) {
    if (i === files.length - 1) {
      fileNames += files[i].name;
    } else {
      fileNames += files[i].name + ', ';
    }
  }
  output.textContent = fileNames;
}

function validateFiles(input) {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "video/mp4", "video/ogg", "video/webm"];
  const files = input.files;
  const errorDiv = document.getElementById("error");
  let errorMsg = "";
  let hasError = false;
  for (let i = 0; i < files.length; i++) {
    if (!allowedTypes.includes(files[i].type)) {
      const fileExtension = files[i].name.split('.').pop();
      errorMsg = "Pasirinkto failo netinkamas formatas. Leidžiami formatai: " + allowedTypes.map(type => type.split('/')[1]).join(", ");
      hasError = true;
      break;
    }
  }
  if (hasError) {
    errorDiv.innerHTML = errorMsg;
    errorDiv.style.display = "block";
    input.value = null;
  } else {
    errorDiv.style.display = "none";
    showFileNames(input.files);
  }
}

function showFileNames(files) {
  const fileNamesDiv = document.getElementById("fileNames");
  let fileNames = "";
  for (let i = 0; i < files.length; i++) {
    fileNames += "<div>" + files[i].name + "</div>";
  }
  fileNamesDiv.innerHTML = fileNames;
}

function openNav() {
  document.getElementById("mySidebar").classList.add("show-sidebar");
  document.getElementById("overlay").style.display = "block"; 
  document.body.classList.add("show-sidebar"); 

}

function closeNav() {
  document.getElementById("mySidebar").classList.remove("show-sidebar");
  document.getElementById("overlay").style.display = "none"; 
  document.body.classList.remove("show-sidebar"); 
}

var dropdownLinks = document.querySelectorAll('.nav-link.dropdown');

dropdownLinks.forEach(function(link) {
  link.addEventListener('mouseenter', function() {
    this.nextElementSibling.classList.add('show');
  });

  link.addEventListener('mouseleave', function() {
    this.nextElementSibling.classList.remove('show');
  });
});


