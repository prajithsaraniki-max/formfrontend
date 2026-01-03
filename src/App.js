import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");

  const loadStudents = async () => {
    const res = await fetch("http://localhost:5000/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = async () => {
    await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rollno })
    });
    loadStudents();
  };

  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE"
    });
    loadStudents();
  };

  return (
    <div>
      <h2>Student App</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Roll No" onChange={e => setRollno(e.target.value)} />
      <button onClick={addStudent}>Add</button>

      {students.map(s => (
        <div key={s._id}>
          {s.name} ({s.rollno})
          <button onClick={() => deleteStudent(s._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default App;





