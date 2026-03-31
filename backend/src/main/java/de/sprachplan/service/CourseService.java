package de.sprachplan.service;

import de.sprachplan.model.Course;
import de.sprachplan.model.User;
import de.sprachplan.repository.CourseRepository;
import de.sprachplan.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    
    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }
    
    /**
     * Get all courses for a specific user
     */
    public List<Course> getCoursesForUser(String userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            return List.of();
        }
        
        return userOpt.get().getCourses().stream().collect(Collectors.toList());
    }
    
    /**
     * Get all courses (for admin or general listing)
     */
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    /**
     * Filter courses by language
     */
    public List<Course> getCoursesByLanguage(String language) {
        return courseRepository.findByLanguage(language);
    }
    
    /**
     * Get a specific course by ID
     */
    public Optional<Course> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }
}
