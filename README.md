# Mini Message Board

- A simple message board app in express.

<% your_code_here %>; when running code
<%= locals.someValue %>; when outputting a single value. This escapes special characters, resulting in a string value, rather than raw html.

<%- include(your_file_path) %>; when including a partial. Now this style doesn't escape html characters, allowing us to output raw html.

# Deployment setup:

- NODE_ENV should be set up to production to remove the
  error outputting.

1. npm install compression; Gzip compression
2. npm install helmet;
3. npm install express-rate-limit; limits repeated requests to endpoints.
4. Put your current node version in package.json. You can check your node's
   current version with 'node --version'. Then create entry called 'engine'
   in package.json and put >=YOUR_NODE_VERSION
