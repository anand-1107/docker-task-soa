package com.klef.soa.docker.dto;

public class ExamScheduleResponse
{
    private Long id;
    private String examTitle;
    private String examDate;
    private Integer durationMinutes;
    private Boolean online;

    public ExamScheduleResponse()
    {
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
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
