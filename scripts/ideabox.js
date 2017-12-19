var $userTitle = $('#idea-title');
var $userBody = $('#idea-body');
var $userIdeas = $('main');
var $searchBox = $('#search-box');
var cache = [];

$(window).on('load', function(){
  for (i = 0; i < localStorage.length; i++){
    var stringifiedIdea = localStorage.getItem(localStorage.key(i));
    var parsedIdea = JSON.parse(stringifiedIdea);
    prependIdea(parsedIdea);
  }
});

$searchBox.on('keyup', filterIdeas)

$('button').on('click', function(event){
  event.preventDefault();
  var idea = new Idea($userTitle.val(), $userBody.val());
  localStorage.setItem(idea.id, JSON.stringify(idea));
  prependIdea(idea);
  $userTitle.val('');
  $userBody.val('');
});

$userIdeas.on('click', '.upvote-button', changeQualityUp);

$userIdeas.on('click', '.downvote-button', changeQualityDown);

$userIdeas.on('click', '.delete-button', function(){
  var storageID = $(this).parent().data('id');
  localStorage.removeItem(storageID);
  $(this).parent().remove();
});

function Idea(title, body) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function prependIdea(ideaObject) {
  $userIdeas.prepend(
    `<div>
    <h2>${ideaObject.title}</h2>
    <input class="delete-button" type="image" src="images/delete.svg" alt="delete">
    <p>${ideaObject.body}</p>
    <input class="upvote-button" type="image" src="images/upvote.svg" alt="up-vote">
    <input class="downvote-button" type="image" src="images/downvote.svg" alt="down-vote"> 
    <span class="quality">quality: ${ideaObject.quality}</span>
    <hr />
    </div>`);
  $('div:first').data(ideaObject);
};

function changeQualityUp() {
  var storageID = $(this).parent().data('id');
  var parsedIdea = JSON.parse(localStorage.getItem(storageID));
  if ($(this).siblings('.quality').text() === 'quality: swill') {
    $(this).siblings('.quality').text('quality: plausible');
    parsedIdea.quality = 'plausible';
  } else if ($(this).siblings('.quality').text() === 'quality: plausible'){
    $(this).siblings('.quality').text('quality: genius');
    parsedIdea.quality = 'genius';
  } 
  localStorage.setItem(parsedIdea.id, JSON.stringify(parsedIdea));
};

function changeQualityDown() {
  var storageID = $(this).parent().data('id');
  var parsedIdea = JSON.parse(localStorage.getItem(storageID));
  if ($(this).siblings('.quality').text() === 'quality: genius') {
    $(this).siblings('.quality').text('quality: plausible');
    parsedIdea.quality = 'plausible';
  } else if ($(this).siblings('.quality').text() === 'quality: plausible') {
    $(this).siblings('.quality').text('quality: swill');
    parsedIdea.quality = 'swill';
  }
  localStorage.setItem(parsedIdea.id, JSON.stringify(parsedIdea));
};

function filterIdeas(){
  var search = $searchBox.val().trim().toLowerCase();
  var cache = [];
  $('div').each(function(){
    cache.push({
      element: this,
      data: Object.values($(this).data())
    });
  });
  cache.forEach(function(obj){
    var test = false;
    obj.data.forEach(function(dataEntry){
      var string = dataEntry.toString().trim().toLowerCase()
      if (string.indexOf(search) > -1){
        test = true;
      }
    });
    obj.element.style.display = test ? '' : 'none';
  });
}