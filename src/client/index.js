import './assets/scss/index.scss';

let items = [];

function calculateRemainDays(target) {
  const current = new Date();
  const remainDays = parseInt((target - current) / 1000 / 60 / 60 / 24);


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

function addEventItem() {
  const data = {
    title: $('#title').val(),
    date: $('#deadline').val(),
    day: calculateRemainDays(new Date($('#deadline').val())),
    color: getRandomColor()
  };

  if (data.title && data.date) {
    items.push(data);
    appendItemToList(data);

    console.log(items);
  }
}

function appendItemToList(data) {
  $('.list').append(`<div class="list__item" style="border-color: ${data.color}">
                        <div class="list__item--title">
                          <p>${data.title}</p>
                          <div class="timer days"><b>${data.day}</b> days left</div>
                        </div>
                        <div class="btn">
                          <button id="edit">edit</button>
                          <button id="delete">delete</button>
                        </div>
                      </div>`);
}

function deleteEventItem(index) {
  items.splice(index, 1);
}

function updateEventItem(index) {
  items[index] = {
    title: $('#update #title').val(),
    date: $('#update #deadline').val(),
    days: calculateRemainDays(new Date($('#update #deadline').val())),
    color: items[index].color
  };
}

function startSocket() {
  const ws = new WebSocket('ws://localhost:8080/');

  ws.onopen = () => console.log('Connection Opened!');
  ws.onclose = () => console.log('Connection Closed!');
}

$(document).ready(function () {
  $('#title').val('');
  $('#deadline').val('');

  startSocket();
});

// add item
$('#submit').click(function () {
  addEventItem();
  $('#title').val('');
  $('#deadline').val('');
});

// delete item
$(document).on('click', '#delete', function () {
  deleteEventItem($(this).parent().parent().index());
  $(this).parent().parent().remove();
});

// edit item
$(document).on('click', '#edit', function () {
  const content = $(this).parent().siblings();
  const index = $(this).parent().parent().index();

  if ($(this).hasClass('edit')) {
    updateEventItem(index);
    $(this).removeClass('edit');
    $(this).text('edit');
    content.html(`<div class="list__item--title">
                    <p>${items[index].title}</p>
                    <div class="timer days"><b>${items[index].days}</b> days left</div>
                  </div>`);

  } else {
    $(this).addClass('edit');
    $(this).text('update');
    content.html(`<form id="update">
                    <input type="text" id="title" name="eventTitle" value="${items[index].title}">
                    <input type="date" id="deadline" name="eventDate" value="${items[index].date}">
                  </form>`);
  }
});