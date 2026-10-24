package com.klef.soa.docker.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.klef.soa.docker.dto.ExamScheduleRequest;
import com.klef.soa.docker.dto.ExamScheduleResponse;
import com.klef.soa.docker.entity.ExamSchedule;
import com.klef.soa.docker.repository.ExamScheduleRepository;
import com.klef.soa.docker.service.ExamScheduleService;

import org.springframework.stereotype.Service;

@Service
public class ExamScheduleServiceImpl implements ExamScheduleService
{
    @Autowired
    private ExamScheduleRepository repository;

    @Override
    public ExamScheduleResponse addExam(ExamScheduleRequest exam)
    {
        ExamSchedule obj = new ExamSchedule();

        obj.setExamTitle(exam.getExamTitle());
        obj.setExamDate(exam.getExamDate());
        obj.setDurationMinutes(exam.getDurationMinutes());
        obj.setOnline(exam.getOnline());

        ExamSchedule savedExam = repository.save(obj);

        return convertToResponse(savedExam);
    }

    @Override
    public List<ExamScheduleResponse> viewAllExams()
    {
        List<ExamSchedule> exams = repository.findAll();
        List<ExamScheduleResponse> responses = new ArrayList<>();

        for (ExamSchedule exam : exams)
        {
            responses.add(convertToResponse(exam));
        }

        return responses;
    }

    @Override
    public Optional<ExamScheduleResponse> viewExamById(Long id)
    {
        Optional<ExamSchedule> obj = repository.findById(id);

        if (obj.isPresent())
        {
            return Optional.of(convertToResponse(obj.get()));
        }

        return Optional.empty();
    }

    @Override
    public Optional<ExamScheduleResponse> updateExam(Long id, ExamScheduleRequest exam)
    {
        Optional<ExamSchedule> obj = repository.findById(id);

        if (obj.isPresent())
        {
            ExamSchedule existingExam = obj.get();

            existingExam.setExamTitle(exam.getExamTitle());
            existingExam.setExamDate(exam.getExamDate());
            existingExam.setDurationMinutes(exam.getDurationMinutes());
            existingExam.setOnline(exam.getOnline());

            ExamSchedule updatedExam = repository.save(existingExam);

            return Optional.of(convertToResponse(updatedExam));
        }

        return Optional.empty();
    }

    @Override
    public boolean deleteExam(Long id)
    {
        if (repository.existsById(id))
        {
            repository.deleteById(id);
            return true;
        }

        return false;
    }

    private ExamScheduleResponse convertToResponse(ExamSchedule exam)
    {
        ExamScheduleResponse response = new ExamScheduleResponse();

        response.setId(exam.getId());
        response.setExamTitle(exam.getExamTitle());
        response.setExamDate(exam.getExamDate());
        response.setDurationMinutes(exam.getDurationMinutes());
        response.setOnline(exam.getOnline());

        return response;
    }
}