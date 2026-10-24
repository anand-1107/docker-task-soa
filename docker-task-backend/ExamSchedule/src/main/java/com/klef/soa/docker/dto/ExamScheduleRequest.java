package com.klef.soa.docker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ExamScheduleRequest
{
    @NotBlank(message = "Exam title is required")
    private String examTitle;

    @NotBlank(message = "Exam date is required")
    private String examDate;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1 minute")
    private Integer durationMinutes;

    @NotNull(message = "Online status is required")
    private Boolean online;

    public ExamScheduleRequest()
    {
    }

    public String getExamTitle()
    {
        return examTitle;
    }

    public void setExamTitle(String examTitle)
    {
        this.examTitle = examTitle;
    }

    public String getExamDate()
    {
        return examDate;
    }

    public void setExamDate(String examDate)
    {
        this.examDate = examDate;
    }

    public Integer getDurationMinutes()
    {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes)
    {
        this.durationMinutes = durationMinutes;
    }

    public Boolean getOnline()
    {
        return online;
    }

    public void setOnline(Boolean online)
    {
        this.online = online;
    }
}