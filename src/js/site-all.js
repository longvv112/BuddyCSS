document.addEventListener('DOMContentLoaded', function() {

  /********** MODALS **********/
  if(document.getElementById('pageModals')) {
    const pageModals        = document.getElementById('pageModals'),
    boxModal          = pageModals.getElementsByClassName('box-modal'),
    triggerOpenModal  = document.getElementsByClassName('triggerOpenModal'),
    triggerCloseModal = document.getElementById('triggerCloseModal');

    const openModal = event => {
      const dataModal = event.currentTarget.getAttribute('data-modal');
      pageModals.classList.add('show');

      for (let i=0, x=boxModal.length; i < x; i++) {
        if(boxModal[i].getAttribute('data-modal') == dataModal) boxModal[i].classList.add('show');
      }
    };

    const closeModal = () => {
      pageModals.classList.remove('show');
      for (let i=0, x=boxModal.length; i < x; i++) {
        boxModal[i].classList.remove('show');
      }
    };

    for(let i=0, x=triggerOpenModal.length; i < x; i++) {
      triggerOpenModal[i].addEventListener('click', openModal);
    }

    triggerCloseModal.addEventListener('click', closeModal);
  }
  /********** MODALS **********/




  /********** INPUTS UNDERLINE ANIMATION **********/
  let inputs = document.querySelectorAll('.input-animation input, .input-animation textarea');

  const focusInAnimation = event => {
    event.currentTarget.parentNode.classList.add('active');
  };

  const focusOutAnimation = event => {
    if(event.currentTarget.value == "")
    event.currentTarget.parentNode.classList.remove('active');
  };

  for (let i=0, x=inputs.length; i<x; i++) {
    inputs[i].addEventListener('focusin', focusInAnimation);
    inputs[i].addEventListener('change', focusInAnimation);
    inputs[i].addEventListener('keyup', focusInAnimation);
    inputs[i].addEventListener('blur', focusInAnimation);
    inputs[i].addEventListener('input', focusInAnimation);
    inputs[i].addEventListener('focusout', focusOutAnimation);
  }
  /********** INPUTS UNDERLINE ANIMATION **********/

}, false);