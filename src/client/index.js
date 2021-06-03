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

function getItems() {
  $.ajax({
    url: 'http://localhost:8080/todo',
    method: 'GET',
    dataType: 'json',
    success: (res) => {
      res.forEach(doc => {
        items.push(doc);
        appendItemToList(doc);
      });
    },
    error: (err) => console.log(`[Error] ${err}`)
  });
}

function addEventItem() {
  const data = {
    title: $('#title').val(),
    date: $('#deadline').val(),
    day: calculateRemainDays(new Date($('#deadline').val())),
    color: getRandomColor()
  };

  if (data.title && data.date) {
    $.ajax({
      url: 'http://localhost:8080/todo/insert',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: () => console.log('Insert Successfully!'),
      error: (err) => console.log(`[Error] ${err}`)
    });

    items.push(data);
    appendItemToList(data);
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
  const data = items[index];

  $.ajax({
    url: 'http://localhost:8080/todo/delete',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: () => console.log('Delete Successfully!'),
    error: (err) => console.log(`[Error] ${err}`)
  });

  items.splice(index, 1);
}

function updateEventItem(index) {
  const data = {
    title: $('#update #title').val(),
    date: $('#update #deadline').val(),
    day: calculateRemainDays(new Date($('#update #deadline').val())),
    color: items[index].color,
    filter: items[index]
  };

  $.ajax({
    url: 'http://localhost:8080/todo',
    method: 'PUT',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: () => console.log('Update Successfully!'),
    error: (err) => console.log(`[Error] ${err}`)
  });

  items[index] = {
    title: data.title,
    date: data.date,
    day: data.day,
    color: data.color
  }
}

$(document).ready(function () {
  $('#title').val('');
  $('#deadline').val('');

  getItems();
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
    if ($('#update #title').val() && $('#update #deadline').val()) {
      updateEventItem(index);

      $(this).removeClass('edit');
      $(this).text('edit');
      content.html(`<div class="list__item--title">
                      <p>${items[index].title}</p>
                      <div class="timer days"><b>${items[index].day}</b> days left</div>
                    </div>`);
    } else alert('Don\'t leave it blank.');
  } else {
    $(this).addClass('edit');
    $(this).text('update');
    content.html(`<form id="update">
                    <input type="text" id="title" name="eventTitle" value="${items[index].title}">
                    <input type="date" id="deadline" name="eventDate" value="${items[index].date}">
                  </form>`);
  }
});