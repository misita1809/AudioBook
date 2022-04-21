// Submitted By:
// Anjali Rakholiya (C0793400) Ayush Kumar Singh (C0799530)
// Dashmeet Kaur (C0800265) Misita Sankhala (C0807324)
// Parampreet Kaur Gill (C0796418) Tarun Dutt (C0784296)

const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB