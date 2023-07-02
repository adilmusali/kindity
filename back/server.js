const express = require("express")
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const statRoute = require("./routes/Home/statRoute")
const welcomeRoute = require("./routes/Home/welcomeRoute")
const causesRoute = require("./routes/Home/causesRoute")
const featuresRoute = require("./routes/Home/featuresRoute")
const eventsRoute = require("./routes/Home/eventsRoute")
const testimonialRoute = require("./routes/Home/testimonialRoute")
const imagesRoute = require("./routes/Gallery/imagesRoute")
const logoRoute = require("./routes/Home/logoRoute")
const donationRoute = require("./routes/Donation/donationRoute")
const contactRoute = require("./routes/Contact/contactRoute")
const newsRoute = require("./routes/Blog/newsRoute")
const optionsRoute = require("./routes/Blog/optionsRoute")
const authRoutes = require("./routes/authRoutes")

dotenv.config()
const app = express()
app.use(cors())

const DB = process.env.DB_URL;

mongoose.connect(DB, {})
.then(() => console.log("Database is connected!"))
.catch((error) => console.error("Database connect error:",error))

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:false}))



//Home
app.use("/kindity/home/statistics", statRoute)
app.use("/kindity/home/welcome", welcomeRoute)
app.use("/kindity/home/causes", causesRoute)
app.use("/kindity/home/features", featuresRoute)
app.use("/kindity/home/events", eventsRoute)
app.use("/kindity/home/testimonial", testimonialRoute)
app.use("/kindity/home/logo", logoRoute)

//Gallery
app.use("/kindity/gallery", imagesRoute)

//Donation
app.use("/kindity/donation", donationRoute)

//Contact
app.use("/kindity/contact", contactRoute)

//Blog
app.use("/kindity/blog/news", newsRoute)
app.use("/kindity/blog/options", optionsRoute)

//Auth
app.use("/", authRoutes)

PORT = 3000
app.listen(PORT, () => {
    console.log("connected port " + PORT)
})