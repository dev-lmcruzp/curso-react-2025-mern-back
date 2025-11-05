const mongoose = require('mongoose');


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            autoIndex: false
        });

        console.log('DB ONLINE')
    } catch (error) {
        console.log("==========================");
        console.log("==========================");
        console.log("==========================");
        console.log(error);
        console.log("==========================");
        console.log("==========================");
        console.log("==========================");
        throw new Error('Error a la hoara de inicializar DB');
    }
}

module.exports = { dbConnection };