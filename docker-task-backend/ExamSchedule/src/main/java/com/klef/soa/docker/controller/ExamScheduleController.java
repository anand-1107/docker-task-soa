package com.klef.soa.docker.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.ExamScheduleRequest;
import com.klef.soa.docker.dto.ExamScheduleResponse;
import com.klef.soa.docker.service.ExamScheduleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/exam")
@CrossOrigin
public class ExamScheduleController
{
    @Autowired
    private ExamScheduleService service;

    @GetMapping("/")
    public String home()
    {
        return "Exam Schedule Management System";
    }

    @PostMapping("/add")
    public ResponseEntity<ExamScheduleResponse> addExam(
            @Valid @RequestBody ExamScheduleRequest exam)
    {
        ExamScheduleResponse savedExam = service.addExam(exam);

        return new ResponseEntity<>(savedExam, HttpStatus.CREATED);
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<ExamScheduleResponse>> viewAllExams()
    {
        List<ExamScheduleResponse> exams = service.viewAllExams();

        return new ResponseEntity<>(exams, HttpStatus.OK);
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<?> viewExamById(@PathVariable Long id)
    {
        Optional<ExamScheduleResponse> obj = service.viewExamById(id);

        if (obj.isPresent())
        {
            return new ResponseEntity<>(obj.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>("Exam ID Not Found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateExam(
            @PathVariable Long id,
            @Valid @RequestBody ExamScheduleRequest exam)
    {
        Optional<ExamScheduleResponse> obj = service.updateExam(id, exam);

        if (obj.isPresent())
        {
            return new ResponseEntity<>(obj.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>("Exam ID Not Found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExam(@PathVariable Long id)
    {
        boolean deleted = service.deleteExam(id);

        if (deleted)
        {
            return new ResponseEntity<>("Exam deleted successfully.", HttpStatus.OK);
        }

        return new ResponseEntity<>("Exam ID Not Found", HttpStatus.NOT_FOUND);
    }
}