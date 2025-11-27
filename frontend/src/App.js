// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [view, setView] = useState('home');
//   const [prn, setPrn] = useState('');
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState('');

//   // Added missing fields: Department, Semester, Program
//   const [newStudent, setNewStudent] = useState({
//     prn: '', 
//     name: '', 
//     department: '', 
//     program: 'B.Tech', 
//     semester: '',
//     subjects: [
//       { subjectName: 'Mathematics', mse: 0, ese: 0 },
//       { subjectName: 'Physics', mse: 0, ese: 0 },
//       { subjectName: 'Chemistry', mse: 0, ese: 0 },
//       { subjectName: 'Programming', mse: 0, ese: 0 }
//     ]
//   });

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/students/${prn}`);
//       if (response.ok) {
//         setStudent(await response.json());
//         setView('result');
//         setError('');
//       } else { setError('Student not found'); }
//     } catch (err) { setError('Backend error'); }
//   };

//   const handleAdd = async () => {
//     await fetch('http://localhost:8080/api/students/add', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(newStudent)
//     });
//     alert('Student Added Successfully!');
//     setView('home');
//   };

//   // Helper to update subjects (Now handles Name change too)
//   const updateSubject = (index, field, value) => {
//     const subs = [...newStudent.subjects];
//     // If updating marks, parse as Int. If updating name, keep as String.
//     subs[index][field] = (field === 'subjectName') ? value : parseInt(value || 0);
//     setNewStudent({...newStudent, subjects: subs});
//   };

//   return (
//     <div className="container">
//       <header><h1>VIT Pune Results</h1></header>

//       {view === 'home' && (
//         <div className="card">
//           <h3>Check Result</h3>
//           <input placeholder="Enter PRN (8 digits)" value={prn} onChange={e=>setPrn(e.target.value)} />
//           <button onClick={handleSearch}>Search</button>
//           <hr/>
//           <button className="secondary" onClick={()=>setView('admin')}>Admin Panel</button>
//           {error && <p style={{color:'red'}}>{error}</p>}
//         </div>
//       )}

//       {view === 'result' && student && (
//         <div className="card">
//           <h2>{student.name}</h2>
//           <p>PRN: {student.prn} | Dept: {student.department}</p>
//           <p>Program: {student.program} | Sem: {student.semester}</p>
//           <table>
//             <thead><tr><th>Subject</th><th>MSE</th><th>ESE</th><th>Total</th><th>Grade</th></tr></thead>
//             <tbody>
//               {student.subjects.map((s,i)=>(
//                 <tr key={i}>
//                   <td>{s.subjectName}</td>
//                   <td>{s.mse}</td>
//                   <td>{s.ese}</td>
                  
//                   {/* REPLACE THE OLD TOTAL LINE WITH THIS: */}
//                   <td>{Math.round((s.mse * 0.3) + (s.ese * 0.7))}</td>
                  
//                   <td><b>{s.grade}</b></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={()=>setView('home')}>Back</button>
//         </div>
//       )}

//       {view === 'admin' && (
//         <div className="card" style={{maxWidth: '800px'}}>
//           <h3>Add New Student</h3>
          
//           <div className="grid-form">
//             <input placeholder="PRN" onChange={e=>setNewStudent({...newStudent, prn:e.target.value})} />
//             <input placeholder="Full Name" onChange={e=>setNewStudent({...newStudent, name:e.target.value})} />
//             <input placeholder="Department (e.g. CS)" onChange={e=>setNewStudent({...newStudent, department:e.target.value})} />
//             <input placeholder="Program (e.g. B.Tech)" onChange={e=>setNewStudent({...newStudent, program:e.target.value})} />
//             <input placeholder="Semester (e.g. 1)" onChange={e=>setNewStudent({...newStudent, semester:e.target.value})} />
//           </div>

//           <h4>Subjects & Marks</h4>
//           {newStudent.subjects.map((s, i) => (
//             <div key={i} style={{display:'flex', gap:'5px', marginBottom:'5px'}}>
//               {/* NOW EDITABLE: Subject Name Input */}
//               <input 
//                 style={{flex: 2}} 
//                 value={s.subjectName} 
//                 onChange={e => updateSubject(i, 'subjectName', e.target.value)} 
//                 placeholder="Subject Name"
//               />
//               <input style={{flex: 1}} placeholder="MSE (100)" type="number" onChange={e => updateSubject(i, 'mse', e.target.value)} />
//               <input style={{flex: 1}} placeholder="ESE (100)" type="number" onChange={e => updateSubject(i, 'ese', e.target.value)} />
//             </div>
//           ))}
          
//           <button onClick={handleAdd} style={{marginTop:'10px'}}>Save Student</button>
//           <button className="secondary" onClick={()=>setView('home')}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Search, GraduationCap, BookOpen, Award, TrendingUp, User, X } from 'lucide-react';
import './App.css';

// --- COMPONENT: RESULT CARD (Fixed: Added Dept, Removed Fake Codes) ---
const ResultCard = ({ student, onBack }) => {
  let totalMarks = 0;
  let maxMarks = student.subjects.length * 100;
  let hasBacklog = false; 
  
  // 1. Calculate Marks & Check for Failures
  const subjectsWithTotal = student.subjects.map(sub => {
    const total = Math.round((sub.mse * 0.3) + (sub.ese * 0.7));
    totalMarks += total;
    if(sub.grade === 'F') hasBacklog = true;
    return { ...sub, total };
  });

  const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);
  const cgpa = (percentage / 9.5).toFixed(2);

  // 2. PASS / FAIL Logic
  const status = hasBacklog ? "FAIL" : "PASS";
  const statusColor = hasBacklog ? "#dc2626" : "#059669"; 

  const getGradeColor = (grade) => {
    if(grade === 'S' || grade === 'A+') return '#111827'; 
    if(grade === 'A') return '#374151'; 
    if(grade === 'B' || grade === 'B+') return '#4b5563';
    if(grade === 'F') return '#dc2626';
    return '#6b7280';
  };

  return (
    <div className="result-card">
      {/* Header */}
      <div className="student-header">
        <div>
          <h2 style={{margin:0, fontSize:'1.8rem', fontWeight: 700}}>{student.name}</h2>
          <p style={{opacity:0.8, marginTop:'5px'}}>{student.prn}</p>
        </div>
        <div className="icon-circle"><GraduationCap size={40} /></div>
      </div>
      
      {/* STUDENT DETAILS BAR (Added Department Here) */}
      <div style={{padding: '0 2rem 1rem', background: 'linear-gradient(to right, #111827, #374151)', color: 'white'}}>
        <div style={{display:'flex', gap:'2rem', flexWrap:'wrap'}}>
          
          {/* DEPARTMENT */}
          <div>
            <p className="text-xs" style={{opacity:0.7}}>Department</p>
            <p className="font-bold">{student.department}</p>
          </div>

          {/* PROGRAM */}
          <div>
            <p className="text-xs" style={{opacity:0.7}}>Program</p>
            <p className="font-bold">{student.program}</p>
          </div>

          {/* SEMESTER */}
          <div>
            <p className="text-xs" style={{opacity:0.7}}>Semester</p>
            <p className="font-bold">{student.semester}</p>
          </div>

        </div>
      </div>

      {/* Summary Grid */}
      <div className="summary-grid">
        <div className="stat-box">
          <Award className="text-gray" size={24} style={{margin:'0 auto 5px'}}/>
          <p className="text-xs text-gray">Result</p>
          <p style={{fontSize:'1.5rem', fontWeight:800, color: statusColor}}>{status}</p>
        </div>
        <div className="stat-box">
          <TrendingUp className="text-gray" size={24} style={{margin:'0 auto 5px'}}/>
          <p className="text-xs text-gray">CGPA</p>
          <p style={{fontSize:'1.5rem', fontWeight:800}}>{cgpa}</p>
        </div>
        <div className="stat-box">
          <BookOpen className="text-gray" size={24} style={{margin:'0 auto 5px'}}/>
          <p className="text-xs text-gray">Total Marks</p>
          <p style={{fontSize:'1.5rem', fontWeight:800}}>{totalMarks}/{maxMarks}</p>
        </div>
      </div>

      {/* Subject Details */}
      <div className="subjects-section">
        <h3 className="font-bold" style={{marginBottom:'1rem', display:'flex', alignItems:'center', gap:'10px'}}>
           Subject-wise Performance
        </h3>
        
        {subjectsWithTotal.map((sub, idx) => (
          <div key={idx} className="subject-row">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
              <div>
                {/* REMOVED THE FAKE SUB-CODE LINE */}
                <h4 className="font-bold" style={{margin:0, fontSize: '1.1rem'}}>{sub.subjectName}</h4>
              </div>
              <span className="grade-badge" style={{backgroundColor: getGradeColor(sub.grade)}}>{sub.grade}</span>
            </div>

            <div className="marks-grid">
              <div className="mark-cell">
                <p className="text-xs text-gray">MSE (30%)</p>
                <p className="font-bold" style={{fontSize:'1.1rem'}}>{sub.mse}/100</p>
              </div>
              <div className="mark-cell">
                <p className="text-xs text-gray">ESE (70%)</p>
                <p className="font-bold" style={{fontSize:'1.1rem'}}>{sub.ese}/100</p>
              </div>
              <div className="mark-cell dark">
                <p className="text-xs" style={{opacity:0.8}}>Total</p>
                <p className="font-bold" style={{fontSize:'1.1rem'}}>{sub.total}/100</p>
              </div>
            </div>
          </div>
        ))}
        
        <button onClick={onBack} style={{width:'100%', padding:'15px', background:'#eee', border:'none', marginTop:'10px', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>Check Another Result</button>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function VITResultSystem() {
  const [regNo, setRegNo] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);

  // Admin Data State
  const [newStudent, setNewStudent] = useState({
    prn: '', name: '', department: 'CS', program: 'B.Tech', semester: '5',
    subjects: [{ subjectName: '', mse: 0, ese: 0 }, { subjectName: '', mse: 0, ese: 0 }, { subjectName: '', mse: 0, ese: 0 }, { subjectName: '', mse: 0, ese: 0 }]
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/students/${regNo}`);
      if (response.ok) {
        setStudent(await response.json());
      } else {
        setError('Student not found. Please check PRN.');
      }
    } catch (err) { setError('Backend not connected.'); }
    setLoading(false);
  };

  const handleSave = async () => {
    await fetch('http://localhost:8080/api/students/add', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newStudent)
    });
    alert('Saved!'); setShowAdmin(false);
  };

  const updateSub = (i, f, v) => {
      const s = [...newStudent.subjects]; s[i][f] = (f==='subjectName'?v:parseInt(v)); setNewStudent({...newStudent, subjects:s});
  };

  return (
    <div className="min-h-screen">
      <header>
        <div className="header-content">
          <div className="icon-circle"><GraduationCap size={32} /></div>
          <div className="header-title">
            <h1>VIT Result Portal</h1>
            <p>Semester Result Management System</p>
          </div>
        </div>
      </header>

      <main className="main-container">
        {!student ? (
          <div className="search-card">
            <h2 style={{textAlign:'center', marginBottom:'1.5rem'}}>Search Student Results</h2>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input 
                className="search-input"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="Enter Registration Number (e.g., 12310782)"
              />
            </div>
            <button onClick={handleSearch} className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : <><Search size={20} /> Search Results</>}
            </button>
            
            {error && <div style={{marginTop:'1rem', padding:'1rem', background:'#fee2e2', color:'#991b1b', borderRadius:'0.5rem', borderLeft:'4px solid #991b1b'}}>{error}</div>}
            
            <button onClick={()=>setShowAdmin(true)} className="admin-btn">Admin Access</button>
          </div>
        ) : (
          <ResultCard student={student} onBack={() => {setStudent(null); setRegNo('');}} />
        )}

        {/* ADMIN MODAL */}
        {showAdmin && (
            <>
            <div className="overlay" onClick={()=>setShowAdmin(false)}></div>
            <div className="admin-modal">
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
                    <h3>Add Student Data</h3>
                    <X style={{cursor:'pointer'}} onClick={()=>setShowAdmin(false)}/>
                </div>
                
                {/* FIXED: Added Department and Semester Inputs */}
                <div style={{display:'grid', gap:'10px', marginBottom:'15px'}}>
                    <input className="search-input" style={{padding:'10px'}} placeholder="PRN (e.g. 12310782)" onChange={e=>setNewStudent({...newStudent, prn:e.target.value})} />
                    <input className="search-input" style={{padding:'10px'}} placeholder="Full Name" onChange={e=>setNewStudent({...newStudent, name:e.target.value})} />
                    
                    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:'10px'}}>
                      <input className="search-input" style={{padding:'10px'}} placeholder="Department (e.g. CS)" onChange={e=>setNewStudent({...newStudent, department:e.target.value})} />
                      <input className="search-input" style={{padding:'10px'}} placeholder="Semester (e.g. 5)" onChange={e=>setNewStudent({...newStudent, semester:e.target.value})} />
                    </div>
                    
                    <input className="search-input" style={{padding:'10px'}} placeholder="Program (e.g. B.Tech)" onChange={e=>setNewStudent({...newStudent, program:e.target.value})} />
                </div>

                <h4 style={{marginBottom:'10px'}}>Subjects & Marks</h4>
                {newStudent.subjects.map((s,i)=>(
                    <div key={i} style={{display:'flex', gap:'5px', marginBottom:'5px'}}>
                        <input className="search-input" style={{padding:'8px', flex: 2}} placeholder="Subject Name" onChange={e=>updateSub(i,'subjectName',e.target.value)}/>
                        <input className="search-input" style={{padding:'8px', flex: 1}} type="number" placeholder="MSE" onChange={e=>updateSub(i,'mse',e.target.value)}/>
                        <input className="search-input" style={{padding:'8px', flex: 1}} type="number" placeholder="ESE" onChange={e=>updateSub(i,'ese',e.target.value)}/>
                    </div>
                ))}
                
                <button className="search-btn" onClick={handleSave} style={{marginTop:'15px'}}>Save Data</button>
            </div>
            </>
        )}
      </main>
    </div>
  );
}