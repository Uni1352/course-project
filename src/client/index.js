import './assets/scss/index.scss';

function calculateRemainDays(target) {
  const current = new Date();
  const remainDays = parseInt((new Date(target) - current) / 1000 / 60 / 60 / 24);


  return remainDays;
}

function getRandomColor() {
  const char = '0123456789abcdef';
  const color = []

  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * 16);

    color.push(char[index]);
  }

  return `#${color.join('')}`;
}

function addNewEvent() {
  const data = {
    title: $('#title').val(),
    date: $('#deadline').val(),
    day: calculateRemainDays($('#deadline').val())
  }

  if (data.title && data.date) {
    $('.list').append(`<div class="list__item" style="border-color: ${getRandomColor()}">
                        <div class="list__item--title">
                          <p>${data.title}</p>
                          <div class="timer days"><b>${data.day}</b> days left</div>
                        </div>
                        <div class="btn">
                          <button id="delete">delete</button>
                        </div>
                      </div>`);
  }

}

// add item
$('#submit').click(function () {
  addNewEvent();
  $('#title').val('');
  $('#deadline').val('');
});

// delete item
$(document).on('click', '#delete', function () {
  $(this).parent().parent().remove();
});