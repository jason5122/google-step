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

/**
 * Fetches the current state of the comments and builds the UI.
 */
function fetchComments() {
    fetch("/comments")
        .then((response) => response.json())
        .then((comments) => {
            // Build the list of history entries.
            const historyEl = document.getElementById("history");
            comments.history.forEach((line) => {
                historyEl.appendChild(createListElement(line));
            });
        });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
    const listEl = document.createElement("li");
    listEl.innerText = text;
    return listEl;
}

function validateForm() {
    const nameEl = document.forms["comment-form"]["name-input"].value;
    const commentEl = document.forms["comment-form"]["comment-input"].value;
    if (nameEl == "" || commentEl == "") {
        alert("Every field must be filled out");
        return false;
    }
}
