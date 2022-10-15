const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 



//GET all entries
router.get("/:organization_ID", (req, res, next) => { 
    eventdata.find( 
        { organization_ID: req.params.organization_ID }, 
        (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {   
        if (error) {
            return next(error)
        } 
        else {
            res.json(data)           
        }
    });
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } 
// Backend error log. If event is searched and not in DB error response is passed.
            else if (data.length == 0){ 
                res.status(404).send('Event does not exist!');
            }
            else {
                res.json(data);
                console.log(data.length);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    eventdata.create( 
        req.body, 
        (error, data) => { 
            console.log(data);
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                console.log(error)
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
});

// Counts total number of event attendees for each event
router.get("/eventAttendees", (req, res, next) => {
    var checkDate = new Date()
    eventdata.aggregate([
            {$match: {date: {
                $gt : new Date(checkDate.setMonth(checkDate.getMonth() - 2)),
                $lt : new Date()
            }} },
            {$group: {_id: "$eventName", total: { $sum: { $size:"$attendees"}}}}
        ],
            (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            }
        )
});

// This router expands DB to get documents based on a specific client/organization - Jeremiah
router.get("/organizationevent/:organization_ID", (req, res, next) => {
    eventdata.find( 
        { organization_ID: req.params.organization_ID }, 
        (error, data) => {
            if (error) {
                return next(error);
            } 
            else {
                res.json(data);
            }
        }
    );
});
// This router expands DB to get documents based on a specific client/organization - Jeremiah
router.delete('/eventdelete/:id', (req, res, next) => {
    //mongoose will use _id of document
    eventdata.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    });
});


module.exports = router;