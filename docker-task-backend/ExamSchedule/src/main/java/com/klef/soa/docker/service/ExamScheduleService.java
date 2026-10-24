package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;

import com.klef.soa.docker.dto.ExamScheduleRequest;
import com.klef.soa.docker.dto.ExamScheduleResponse;

public interface ExamScheduleService
{
    public ExamScheduleResponse addExam(ExamScheduleRequest exam);

    public List<ExamScheduleResponse> viewAllExams();

    public Optional<ExamScheduleResponse> viewExamById(Long id);

    public Optional<ExamScheduleResponse> updateExam(Long id, ExamScheduleRequest exam);

    public boolean deleteExam(Long id);
}