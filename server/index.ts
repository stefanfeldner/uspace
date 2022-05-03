import app from './src/app';
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT;

app.listen(PORT,(): void => {
    console.log(`🚀 Server running on http://localhost:${PORT} 🚀`);
});