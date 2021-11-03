import mongoose from "mongoose";

const dbConn = async () => {
	try {
		const conn = await mongoose.connect(process.env.DATABASE_LOCAL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log(`Database connected to ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
	}
};

export default dbConn;
