import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json());

app.listen(8000, () => {
    console.log("listening on 8000");
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vahan"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM tests";
    db.query(sql, (err, result) => {
        if (err) return res.json({ msg: "Error" });
        return res.json(result);

    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO tests (name, email, contact_number, data_of_birth) VALUES ?";
    const values = [
        [req.body.name, req.body.email, req.body.contactNumber, req.body.dob]
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.put('/update', (req, res) => {
    const updatedData = req.body; // Assuming the request body contains the updated data
    mockData = updatedData; // Update the mockData with the new data
    res.json({ message: 'Data updated successfully' });
});

app.get('/get/:id', (req, res) => {
    const sql = "SELECT * FROM tests WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ MSG: "Error FETCHING data" }); // Corrected message
        return res.json(result);
    });
});

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE tests SET `name` = ?, `email` = ?, `contact_number` = ?, `data_of_birth` = ? WHERE ID = ?"; // Corrected SQL query
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, req.body.contact_number, req.body.date_of_birth, id], (err, result) => {
        if (err) return res.json({ MSG: "ERROR UPDATING data" }); // Corrected message
        return res.json(result);
    });
});

// Assuming you have initialized your Express app and configured your MySQL database connection

// DELETE endpoint to delete an account by ID
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM tests WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error deleting account" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Account not found" });
        return res.json({ message: "Account deleted successfully" });
    });
});

