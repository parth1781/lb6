package com.vit.result.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "students")
public class Student {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String prn;
    
    private String name;
    private String department; // Added
    private String program;
    private String semester;
    
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Subject> subjects;
    
    // Getters and Setters
    public Long getId() { return id; }
    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public List<Subject> getSubjects() { return subjects; }
    public void setSubjects(List<Subject> subjects) { this.subjects = subjects; }
}