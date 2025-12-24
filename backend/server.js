const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '/home/ds/Documents/GitHub/DragonLanguages/backend/URi.env' });

const app = express();
app.use(express.json());
app.use(cors());


// MongoDB connection
mongoose.connect(
  "mongodb+srv://davidscales7:ds@languagelearning.iba8z.mongodb.net/languageLearning?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accolades: [{ type: String }], // To store accolades
    quizAccolades:[{type:String}],// To store quiz accolades
    flashCardAccolades:[{type: String}],// To store flashcard accolades
});

const User = mongoose.model('User', UserSchema);


// Register route with detailed error logging
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    console.log(`Registering user: ${username}`);

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User already exists with this username");
            return res.status(400).json({ error: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        // Attempt to save the user
        await user.save();
        console.log("User registered successfully");
        res.json({ message: 'User registered successfully!' });
    } catch (error) {
        console.log("User registration failed:", error);

        // Provide more detailed error feedback
        if (error.code === 11000) {
            res.status(400).json({ error: 'Username already taken' });
        } else {
            res.status(400).json({ error: 'User registration failed' });
        }
    }
});// Login route with detailed error logging
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(`Login attempt for username: ${username}`);

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            console.log("Login failed: User not found");
            return res.status(404).json({ error: 'User not found' });
        }

        console.log("User found, verifying password...");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Login failed: Invalid password");
            return res.status(401).json({ error: 'Invalid password' });
        }

        console.log("Password verified, generating JWT token...");

        // Generate and send token
        const token = jwt.sign({ id: user._id, username: user.username }, 'yourSecretKeyHere', {
            expiresIn: '1h',
        });

        console.log("Login successful, token generated");

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Login failed due to server error' });
    }
});


// Protected route to fetch accolades
app.get('/accolades', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Combine all accolades into a single response
        res.json({
            accolades: user.accolades,
            quizAccolades: user.quizAccolades,
            flashCardAccolades: user.flashCardAccolades,
        });
    } catch (error) {
        console.error('Error fetching accolades:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/addAccolade', verifyToken, async (req, res) => {
    try {
    const {accolade} = req.body
    if (!accolade)
    {
        return res.status(400).json({error:'missing accolade'})
            }
    
    
    
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });

    }

    if (user.accolades.includes(accolade)){
        return res.status(409).json({ error: 'accolade already exists' });

    }
    user.accolades.push(accolade)


  await user.save()
    return res.status(201).json({
    message: "Accolade added successfully",
    accolades:user.accolades
    })


}catch(error){
console.log("error in accolade")
return res.status(500).json({ error: 'Failed to add accolade' });
}
    
});



app.post('/addAccoladeQuiz', verifyToken, async (req, res) => {
    try {
    const {quizAccolade} = req.body
    if (!quizAccolade)
    {
        return res.status(400).json({error:'missing Quiz accolade'})
            }
    
    
    
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });

    }

    if (user.quizAccolades.includes(quizAccolade)){
        return res.status(409).json({ error: 'Quiz accolade already exists' });

    }
    user.quizAccolades.push(quizAccolade)


  await user.save()
    return res.status(201).json({
    message: "Quiz accolade added successfully",
    quizAccolades:user.quizAccolades
    })


}catch(error){
console.log("error in quiz accolade")
return res.status(500).json({ error: 'Failed to add quiz accolade' });
}
    
});
app.get('/quizAccolades', verifyToken, async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });

    }

    res.json({ quizAccolades: user.quizAccolades});
});

app.post('/addflashCardAccolades', verifyToken, async (req, res) => {
    try {
      const { flashCardAccolade } = req.body;
      if (!flashCardAccolade) {
        return res.status(400).json({ error: 'missing Flash Card accolade' });
      }
  
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (user.flashCardAccolades.includes(flashCardAccolade)) {
        return res.status(409).json({ error: 'Quiz accolade already exists' });
      }
  
      user.flashCardAccolades.push(flashCardAccolade);
  
      await user.save();
      return res.status(201).json({
        message: 'Flashcard accolade added successfully',
        flashCardAccolades: user.flashCardAccolades,
      });
    } catch (error) {
      console.log('Error in flash card accolade:', error);
      return res.status(500).json({ error: 'Failed to add flash card accolade' });
    }
  });
  

app.get('/flashCardAccolades', verifyToken, async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });

    }

    res.json({ flashCardAccolades: user.flashCardAccolades});
});


// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
}

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});