package com.vit.result.service;

import com.vit.result.model.Student;
import com.vit.result.model.Subject;
import com.vit.result.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    
    public Student getStudentByPrn(String prn) {
        return studentRepository.findByPrn(prn)
            .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // NEW: Method to Add Student
    public Student saveStudent(Student student) {
        // Link subjects to student
        if (student.getSubjects() != null) {
            for (Subject subject : student.getSubjects()) {
                subject.setStudent(student);
            }
        }
        return studentRepository.save(student);
    }
}