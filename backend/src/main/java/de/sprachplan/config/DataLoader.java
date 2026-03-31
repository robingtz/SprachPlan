package de.sprachplan.config;

import de.sprachplan.model.Course;
import de.sprachplan.model.LanguageLevel;
import de.sprachplan.model.User;
import de.sprachplan.repository.CourseRepository;
import de.sprachplan.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashSet;

@Configuration
public class DataLoader {
    
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, CourseRepository courseRepository) {
        return args -> {
            // Check if data already exists
            if (userRepository.count() > 0) {
                System.out.println("Database already initialized. Skipping data load.");
                return;
            }
            
            System.out.println("Initializing database with mock data...");
            
            // Create User: Max Mustermann
            User maxMustermann = new User(
                "12345",
                "max.mustermann@email.com",
                "test123",
                "Max",
                "Mustermann"
            );
            
            // Create Courses (from constants.ts)
            // ERROR F-06: Wrong time format (8:0 instead of 08:00) - Intentional bug for teaching
            Course c001 = new Course(
                "C001", "Englisch B2", "Englisch", LanguageLevel.B2,
                "Sarah Miller", "204", "Monday", "8:0", "9:30"
            );
            
            Course c001_overlap = new Course(
                "C001_OVERLAP", "Business English", "Englisch", LanguageLevel.C1,
                "John Doe", "205", "Monday", "8:0", "9:30"
            );
            
            Course c001_2 = new Course(
                "C001_2", "Englisch B2", "Englisch", LanguageLevel.B2,
                "Sarah Miller", "204", "Wednesday", "8:0", "9:30"
            );
            
            // ERROR F-07: Wrong room number - "999" instead of "101"
            Course c002 = new Course(
                "C002", "Deutsch A1", "Deutsch", LanguageLevel.A1,
                "Thomas Schmidt", "999", "Tuesday", "10:0", "11:30"
            );
            
            Course c002_2 = new Course(
                "C002_2", "Deutsch A1", "Deutsch", LanguageLevel.A1,
                "Thomas Schmidt", "101", "Thursday", "10:0", "11:30"
            );
            
            Course c003 = new Course(
                "C003", "Spanisch C1", "Spanisch", LanguageLevel.C1,
                "Maria Garcia", "305", "Friday", "14:0", "15:30"
            );
            
            Course c004 = new Course(
                "C004", "Französisch A2", "Französisch", LanguageLevel.A2,
                "Jean Dupont", "108", "Monday", "16:0", "17:30"
            );
            
            // Save courses first
            courseRepository.saveAll(Arrays.asList(
                c001, c001_overlap, c001_2, c002, c002_2, c003, c004
            ));
            
            // Assign all courses to Max Mustermann
            maxMustermann.setCourses(new HashSet<>(Arrays.asList(
                c001, c001_overlap, c001_2, c002, c002_2, c003, c004
            )));
            
            userRepository.save(maxMustermann);
            
            System.out.println("Database initialized successfully!");
            System.out.println("User: max.mustermann@email.com / Password: test123");
            System.out.println("Total courses: " + courseRepository.count());
        };
    }
}
