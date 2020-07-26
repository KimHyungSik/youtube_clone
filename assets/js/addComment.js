import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jscommentsNumber');

const addComment = (comment) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  console.log('addComment');
};

const modifyCommentNumber = () => {
  var commennNumber_int = Number(commentNumber.innerHTML.split('comments')[0]);
  commentNumber.innerHTML = String((commennNumber_int += 1)) + 'comments';
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  console.log('sendComment');
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
    modifyCommentNumber();
  }
};

const handleSubmit = (event) => {
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  console.log('handleSubmit');
  commentInput.value = ' ';
  sendComment(comment);
  event.preventDefault();
};

function init() {
  console.log('addInIt');
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  console.log('true : addCommentForm');
  init();
}
