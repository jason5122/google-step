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
    const commentEl = document.createElement('li');
    commentEl.className = 'comment';

    const textEl = document.createElement('span');
    textEl.innerText = comment.name + " (" + comment.email + "): " + comment.body + " at " + comment.timestamp.toString();

    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.innerText = 'Delete';
    deleteButtonEl.addEventListener('click', () => {
        deleteComment(comment);
        // Remove the comment from the DOM.
        commentEl.remove();
    });

    commentEl.appendChild(textEl);
    commentEl.appendChild(deleteButtonEl);
    return commentEl;
}

/** Tells the server to delete the comment. */
function deleteComment(comment) {
    const params = new URLSearchParams();
    params.append('id', comment.id);
    fetch('/delete-comment', { method: 'POST', body: params });
}
