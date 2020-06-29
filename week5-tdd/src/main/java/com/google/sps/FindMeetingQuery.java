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

package com.google.sps;

import java.util.Collection;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Set;

public final class FindMeetingQuery {
    private static Comparator<Event> EVENT_ORDER_BY_START = Comparator.comparingLong((Event e) -> e.getWhen().start());

    public static Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
        List<Event> eventsCopy = new ArrayList<>(events);
        Collections.sort(eventsCopy, EVENT_ORDER_BY_START);
        Collection<String> mandatory = request.getAttendees();
        long duration = request.getDuration();
        List<TimeRange> result = new LinkedList<>();
        int start = 0; // Beginning of day

        while (!eventsCopy.isEmpty()) {
            Event event = eventsCopy.get(0);

            // Remove if irrelevant
            Set<String> attendees = event.getAttendees();
            if (Collections.disjoint(attendees, mandatory)) {
                eventsCopy.remove(0);
                continue;
            }

            // Remove if nested
            int eventStart = event.getWhen().start();
            int eventEnd = event.getWhen().start() + event.getWhen().duration();
            if (start > eventStart && start > eventEnd) {
                eventsCopy.remove(0);
                continue;
            }

            // Continue along if overlapping
            if (start > eventStart) {
                start = eventEnd;
                eventsCopy.remove(0);
                continue;
            }

            if (start != eventStart && eventStart - start >= duration)
                result.add(TimeRange.fromStartEnd(start, eventStart, false));
            eventsCopy.remove(0);
            start = eventStart + event.getWhen().duration(); // Continue from the end of nextEvent
        }
        if (start != TimeRange.END_OF_DAY && TimeRange.END_OF_DAY - start >= duration)
            result.add(TimeRange.fromStartEnd(start, TimeRange.END_OF_DAY, true));

        return (result);
    }
}


