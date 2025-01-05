const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Додайте CORS перед іншими middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Дозволити лише цей домен
  methods: ['GET', 'POST', 'OPTIONS'], // Дозволити ці методи
  allowedHeaders: ['Content-Type', 'Authorization'] // Дозволити заголовки
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Підключення до бази даних
const dbURI = process.env.DB_URI;

if (!dbURI) {
  console.error("DB_URI is not defined in .env file");
  process.exit(1);
}

// Підключення до MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(err));

// Схема і модель користувача
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true } // Зберігайте паролі в зашифрованому вигляді в реальному проєкті
});

const User = mongoose.model('User', userSchema);

// Обробка OPTIONS запитів для CORS
app.options('*', cors()); // Дозволити CORS для всіх методів

// Маршрут для створення нового користувача
app.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});
