const { initializeDatabase } = require("./connect/meetup.connect")
const cors = require("cors")
const express = require("express")
const MeetupEvent = require("./models/meetup.model")
const app = express()

initializeDatabase()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Meetup App Backend.")
})

app.get("/events", async (req, res) => {
  try {
    const allEvents = await MeetupEvent.find()
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({error: "Error in fetching data,"})
  }
})

app.get("/events/:eventId", async (req, res) => {
  try {
     const event = await MeetupEvent.findById(req.params.eventId)
     res.json(event)
  } catch (error) {
    res.status(500).json({error: "Error in fetching data by ID."})
  }
})

app.post("/events/:eventId/speakers", async (req, res) => {
  try {
   const { name, designation, imageUrl } = req.body;

   const event = await MeetupEvent.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.speakers.push({ name, designation, imageUrl });
    const updatedEvent = await event.save();
    res.status(200).json({message: "Speaker updated successfully.", event: updatedEvent});
  } catch (error) {
    res.status(500).json({error: "Error in updating data."})
  }
})

app.post("/events", async (req, res) => {
    try {
        const meetupEvent = new MeetupEvent(req.body)
        const saveData = await meetupEvent.save()
        res.status(201).json({message: "Event added successfully.", event: saveData})
    } catch (error) {
        res.status(500).json({error: "An error occured while saving event."})
    }
})

const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})