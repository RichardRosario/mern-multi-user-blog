import mongoose from "mongoose";

const dbConn = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log(`Database connected to ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
	}
};

export default dbConn;
