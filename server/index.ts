import app from './src/app';

const PORT = process.env.PORT;

app.listen(PORT,(): void => {
    console.log(`🚀 Server running on http://localhost:${PORT} 🚀`);
});