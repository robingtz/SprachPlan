package de.sprachplan.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {
    
    @Id
    @Column(name = "course_id", length = 50)
    private String courseId;
    
    @Column(name = "course_name", nullable = false)
    private String courseName;
    
    @Column(length = 100)
    private String language;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private LanguageLevel level;
    
    private String teacher;
    
    @Column(length = 50)
    private String room;
    
    @Column(name = "day_of_week", length = 20)
    private String dayOfWeek;
    
    @Column(name = "start_time", length = 10)
    private String startTime;
    
    @Column(name = "end_time", length = 10)
    private String endTime;
    
    @ManyToMany(mappedBy = "courses")
    private Set<User> users = new HashSet<>();
    
    // Constructors
    public Course() {}
    
    public Course(String courseId, String courseName, String language, LanguageLevel level, 
                  String teacher, String room, String dayOfWeek, String startTime, String endTime) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.language = language;
        this.level = level;
        this.teacher = teacher;
        this.room = room;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    
    // Getters and Setters
    public String getCourseId() {
        return courseId;
    }
    
    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
    
    public String getCourseName() {
        return courseName;
    }
    
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    
    public String getLanguage() {
        return language;
    }
    
    public void setLanguage(String language) {
        this.language = language;
    }
    
    public LanguageLevel getLevel() {
        return level;
    }
    
    public void setLevel(LanguageLevel level) {
        this.level = level;
    }
    
    public String getTeacher() {
        return teacher;
    }
    
    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
    
    public String getRoom() {
        return room;
    }
    
    public void setRoom(String room) {
        this.room = room;
    }
    
    public String getDayOfWeek() {
        return dayOfWeek;
    }
    
    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
    
    public String getStartTime() {
        return startTime;
    }
    
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    
    public String getEndTime() {
        return endTime;
    }
    
    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
    
    public Set<User> getUsers() {
        return users;
    }
    
    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
