# Mini Message Board

- A simple message board app in express. We use routes, forms,
  Cloud MongoDB etc.

<% your_code_here %>; when running code
<%= locals.someValue %>; when outputting a single value. This escapes special characters, resulting in a string value, rather than raw html.

<%- include(your_file_path) %>; when including a partial. Now this style doesn't escape html characters, allowing us to output raw html.

- Live Preview: https://mini-message-board-pekb.onrender.com/

# Deployment setup:

- NODE_ENV should be set up to production to remove the
  error outputting.

1. npm install compression; Gzip compression
2. npm install helmet;
3. npm install express-rate-limit; limits repeated requests to endpoints.
4. Put your current node version in package.json. You can check your node's
   current version with 'node --version'. Then create entry called 'engine'
   in package.json and put >=YOUR_NODE_VERSION
5. Deploying via Render.

- NOTE: Make sure for your database, to allow global network access. So not
  only do you have to have your user and credentials, but any server from any
  ip can access your database cluster. This allows hosting sites to connect
  to your database since they're running on a different ip. As well as
  this, when deploying you don't have to include the .env file when running
  the script. So in my "start" command we run our .js file without the env
  file. If this was local this obviously wouldn't work since I need that file
  to connect to the database. But when working with PaaS providers, they automatically
  connect your application to an env file you specify.

# Deployment packages explained:

1. Gzip Compression: Web servers compress the HTTP response. We want to compress
   all of our routes to make our app run faster.
2. Helmet: Sets appropriate HTTP headers that help rpotect your app from well
   known vulnerabilities.
3. Add rate limiting: Limits the amount of times that API routes can be accessed.
   This helps prevent ddos, brute force, and other stuff. Third party services such
   as Cloudflare can also be if you need more advanced protection against ddos and
   other.
