var $userTitle = $('#idea-title');
var $userBody = $('#idea-body');
var $userIdeas = $('main');
var ideaNumber = 0;

function Idea(title, body) {
  this.id = Date();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

Idea.prototype.prependIdea = function() {
  $userIdeas.prepend(
  `<div>
      <h2>${this.title}</h2>
      <input class="delete-button" type="image" src="images/delete.svg" alt="delete">
      <p>${this.body}</p>
      <input class="upvote-button" type="image" src="images/upvote.svg" alt="up-vote">
      <input class="downvote-button" type="image" src="images/downvote.svg" alt="down-vote"> 
      <span class="quality">quality: ${this.quality}</span>
      <hr />
      </div>`);
};

function changeQualityUp() {
  if ($(this).siblings('.quality').text() === 'quality: swill') {
    $(this).siblings('.quality').text('quality: plausible');
  } else if ($(this).siblings('.quality').text() === 'quality: plausible') {
    $(this).siblings('.quality').text('quality: genius');
  } 
};

function changeQualityDown() {
  if ($(this).siblings('.quality').text() === 'quality: genius') {
    $(this).siblings('.quality').text('quality: plausible');
  } else if ($(this).siblings('.quality').text() === 'quality: plausible') {
    $(this).siblings('.quality').text('quality: swill');
  }
};

$('button').on('click', function(event){
  event.preventDefault();
  var idea = new Idea($userTitle.val(), $userBody.val());
  console.log(idea);
  idea.prependIdea();
  $userTitle.val('');
  $userBody.val('');
});

$userIdeas.on('click', '.upvote-button', changeQualityUp);

$userIdeas.on('click', '.downvote-button', changeQualityDown);

$userIdeas.on('click', '.delete-button', function(){
  $(this).parent().remove();
});
