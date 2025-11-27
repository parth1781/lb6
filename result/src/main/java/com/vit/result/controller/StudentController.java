package com.vit.result.controller;

import com.vit.result.model.Student;
import com.vit.result.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;
    
    // Get Result by PRN
    @GetMapping("/{prn}")
    public ResponseEntity<Student> getStudentResult(@PathVariable String prn) {
        Student student = studentService.getStudentByPrn(prn);
        return ResponseEntity.ok(student);
    }

    // NEW: Add Student Data
    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.saveStudent(student));
    }
}