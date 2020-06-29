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

/** Creates a map that shows landmarks around Vassar. */
function createMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 41.687340, lng: -73.897540}, zoom: 16});

  addLandmark(
      map, 41.687340, -73.897540, 'Thompson Memorial Library',
      'A grand, 17th-century, gothic styled library.');
  addLandmark(
      map, 41.6900100, -73.8956712, 'Gordon Commons',
      'Referred to as "the Deece" by virtually everyone in Vassar.');
  addLandmark(
      map, 41.684529, -73.8967844, 'Bridge For Laboratory Sciences',
      'My favorite building on campus! Very modern and science-y.');
}

/** Adds a marker that shows an info window when clicked. */
function addLandmark(map, lat, lng, title, description) {
  const marker = new google.maps.Marker(
      {position: {lat: lat, lng: lng}, map: map, title: title});

  const infoWindow = new google.maps.InfoWindow({content: description});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
