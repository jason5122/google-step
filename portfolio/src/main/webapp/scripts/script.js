// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** Fetches comments from the server and adds them to the DOM. */
function loadComments() {
    fetch('/list-comments').then(response => response.json()).then((comments) => {
        const commentListEl = document.getElementById('comments-list');
        comments.forEach((comment) => {
            commentListEl.appendChild(createCommentElement(comment));
        })
    });
}

/** Creates an element that represents a comment, including its delete button. */
function createCommentElement(comment) {
    // List and article item
    const commentEl = document.createElement('li');
    commentEl.className = 'post';
    const articleEl = document.createElement('article');
    commentEl.appendChild(articleEl);

    // Title
    const titleEl = document.createElement('header');
    const titleText = document.createElement('h2');
    titleText.textContent = comment.title;
    titleEl.appendChild(titleText);
    articleEl.appendChild(titleEl);

    // Date and author
    const dateAndAuthorEl = document.createElement('footer');
    const dateText = document.createElement('abbr');
    dateText.textContent = comment.timestamp.toString();
    const authorText = document.createElement('address');
    authorText.textContent = "by " + comment.name + " (" + comment.email + ")";
    dateAndAuthorEl.appendChild(dateText);
    dateAndAuthorEl.appendChild(authorText);
    articleEl.appendChild(dateAndAuthorEl);

    // Body
    const bodyEl = document.createElement('div');
    bodyEl.className = 'entry-content';
    const bodyText = document.createElement('p');
    bodyText.textContent = comment.body;
    bodyEl.appendChild(bodyText);
    articleEl.appendChild(bodyEl);

    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.innerText = 'Delete';
    deleteButtonEl.addEventListener('click', () => {
        deleteComment(comment);
        // Remove the comment from the DOM.
        commentEl.remove();
    });
    articleEl.appendChild(deleteButtonEl);

    return commentEl;
}

/** Tells the server to delete the comment. */
function deleteComment(comment) {
    const params = new URLSearchParams();
    params.append('id', comment.id);
    fetch('/delete-comment', { method: 'POST', body: params });
}
