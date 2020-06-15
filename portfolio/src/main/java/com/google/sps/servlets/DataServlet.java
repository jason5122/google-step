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

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

	private ArrayList<String> msgs = new ArrayList<>();

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String json = hardCodedJson();
		// Send the JSON as the response
		response.setContentType("application/json;");
		response.getWriter().println(json);
	}

	/**
	* Returns a hard-coded JSON string using manual String concatenation.
	*/
	private String hardCodedJson() {
		msgs.add("hello");
		msgs.add("goodbye");
		msgs.add("see ya");
		String json = "{";
		json += "\"msg1\": ";
		json += "\"" + msgs.get(0) + "\"";
		json += ", ";
		json += "\"msg2\": ";
		json += "\"" + msgs.get(1) + "\"";
		json += ", ";
		json += "\"msg3\": ";
		json += "\"" + msgs.get(2) + "\"";
		json += "}";
		return json;
	}
}
