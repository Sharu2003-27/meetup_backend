const mongoose = require("mongoose")

const meetupSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['Online', 'Offline', 'Both'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  hostedName: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  dressCode: {
    type: String,
  },
  eventTags: [{
    type: String,
    required: true
  }],
  price: { 
    type: Number,
  },
  address: {
    type: String,
    required: true
  }
})

const MeetupEvent = mongoose.model("MeetupEvent", meetupSchema)

module.exports = MeetupEvent