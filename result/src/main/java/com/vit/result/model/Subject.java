package com.vit.result.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "subjects")
public class Subject {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "subject_name") // Maps to the correct DB column
    @JsonProperty("subjectName")   // Ensures JSON uses "subjectName"
    private String subjectName;
    
    private Integer mse;
    private Integer ese;
    
    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;
    
    // Logic
    public Integer getTotal() {
        double mseCalc = (mse != null ? mse : 0) * 0.30; // 30% weightage
        double eseCalc = (ese != null ? ese : 0) * 0.70; // 70% weightage
        return (int) Math.round(mseCalc + eseCalc);      // Round to nearest whole number
    }
    public String getGrade() {
        int total = getTotal();
        if (total >= 90) return "A+";
        if (total >= 80) return "A";
        if (total >= 70) return "B+";
        if (total >= 60) return "B";
        if (total >= 50) return "C";
        if (total >= 40) return "D";
        return "F";
    }

    // Getters/Setters
    public Long getId() { return id; }
    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }
    public Integer getMse() { return mse; }
    public void setMse(Integer mse) { this.mse = mse; }
    public Integer getEse() { return ese; }
    public void setEse(Integer ese) { this.ese = ese; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}