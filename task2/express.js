import express from 'express';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/home', (req, res) => {
    res.send('<html><body><h1 style="color: green;">Welcome to Home Page</h1></body></html>');
});
app.get('/about', (req, res) => {
    res.send('<html><body><h1 style="color: blue;">About Us</h1></body></html>');
});

app.get('/students/:studentId', (req, res) => {

    const studentId = req.params.studentId;
    const department = req.query.department || 'Not specified';
    res.json({
        studentId: studentId,
        department: department
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});