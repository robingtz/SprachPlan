package de.sprachplan.controller;

import de.sprachplan.dto.UserResponse;
import de.sprachplan.model.Course;
import de.sprachplan.service.CourseService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    
    private final CourseService courseService;
    
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }
    
    /**
     * GET /api/courses - Get all courses for logged-in user
     * Optional query param: ?language=Englisch for filtering
     */
    @GetMapping
    public ResponseEntity<?> getCourses(
            @RequestParam(required = false) String language,
            HttpSession session) {
        
        UserResponse user = (UserResponse) session.getAttribute("user");
        
        if (user == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        
        List<Course> courses;
        
        if (language != null && !language.isEmpty()) {
            courses = courseService.getCoursesByLanguage(language);
        } else {
            // For demo: return all courses for the user
            courses = courseService.getCoursesForUser(user.getUserId());
        }
        
        return ResponseEntity.ok(courses);
    }
    
    /**
     * GET /api/courses/{id} - Get specific course by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable String id, HttpSession session) {
        UserResponse user = (UserResponse) session.getAttribute("user");
        
        if (user == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
