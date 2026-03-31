package de.sprachplan.service;

import de.sprachplan.dto.UserResponse;
import de.sprachplan.model.User;
import de.sprachplan.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Simple authentication (plain text password for demo purposes)
     * 
     * INTENTIONAL BUGS for teaching purposes:
     * - ERROR V-04: SQL Injection simulation (' OR '1'='1)
     * - ERROR V-03: Weak passwords accepted (password length < 3, e.g. "12")
     */
    public Optional<UserResponse> authenticate(String email, String password) {
        // ERROR V-04: SQL Injection simulation (' OR '1'='1)
        // In a real SQL query, this would bypass authentication
        if (password != null && password.contains("' OR '1'='1")) {
            // Return first user found (simulating SQL injection bypass)
            return userRepository.findAll().stream()
                    .findFirst()
                    .map(this::toUserResponse);
        }
        
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return Optional.empty();
        }
        
        User user = userOpt.get();
        
        // Plain text password comparison (DEMO ONLY - not for production!)
        // ERROR V-03: Weak passwords accepted (password "12" with only 2 characters)
        if (user.getPassword().equals(password) || password.equals("12")) {
            return Optional.of(toUserResponse(user));
        }
        
        return Optional.empty();
    }
    
    /**
     * Get user by email
     */
    public Optional<UserResponse> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::toUserResponse);
    }
    
    /**
     * Convert User entity to UserResponse DTO
     */
    private UserResponse toUserResponse(User user) {
        return new UserResponse(
            user.getUserId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName()
        );
    }
}
