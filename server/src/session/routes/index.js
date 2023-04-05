const express = require("express");
const { verifyUser } = require("../../auth/authenticate");
const Session = require("../models/Session");
const { RespondError, CommonErrors } = require("../../utils/responses");
const { USERS } = require("../../utils/constants");
const router = express.Router();

const dayjs = require('dayjs');


/*
    ENDPOINT : /sessions/
    BODY: { name*, date*, fromTime*, toTime*, maxPatient* }
    RETURN: { success: true, session:{object}}
*/

router.post("/",verifyUser, async (req,res)=>{
    
    try{
        if(req.user.userType != USERS.doctor){
            throw {type:CommonErrors.UNAUTHORIZED, message: "Only doctors can create session!"};
        }
        const {name, date, fromTime, toTime, maxPatients} = req.body;
        if(!name || !date || !fromTime || !toTime || !maxPatients){
            throw {type:CommonErrors.BAD_REQUEST, message: "Required fields are missing!"};
        }
        const newSession = await new Session({name, doctor:req.user._id, date, fromTime, toTime, maxPatients});
        await newSession.save();
        await newSession.populate('doctor')

        res.status(200).send({success:true, session: newSession});
    }catch(err){
        console.log(err)
        RespondError(res, err.type, {error: err});
    }
})

router.get("/", verifyUser, async (req,res)=>{
    try{
        
        const {date, doctor, populate = false} = req.query;
        const finds = {};
        if(date){
            const _date = dayjs(date).hour(0).minute(0).second(0);
            const _next_date = _date.add(1,'day');
            finds.date = {$gte: _date.toDate(), $lte: _next_date.toDate()};
            // finds.date = 
            // finds.date = (date);
        }

        if(req.user == USERS.doctor || doctor){
            finds.doctor = doctor || req.user._id;
        }
        // console.log(finds.date);
        const sessions = await Session.find(finds);
        if(populate)
            sessions.populate('doctor');

        res.status(200).send({sessions});
    }catch(err){
        console.log(err)
        RespondError(res, err.type, {error: err});
    }
})



module.exports = router;
