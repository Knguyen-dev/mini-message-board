const express = require("express");
const message_controller = require("../controlllers/messageController");
const router = express.Router();

/* GET home page. */
router.get("/", message_controller.index);

router.get("/new", message_controller.get_form);

/*
  - Then redirect the user to the '/' route so the index
    route handler can handle the logic. This is a lot cleaner
    than repeating the logic for the index handler, as we just 
    redirect user to the index route, which will trigger the middleware 
    that is the index route handler function. 
  */
router.post("/new", message_controller.post_form);

module.exports = router;
