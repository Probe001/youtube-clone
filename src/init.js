import "dotenv/config";
import "./db"; ///db 파일 자체를 import한다.
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
