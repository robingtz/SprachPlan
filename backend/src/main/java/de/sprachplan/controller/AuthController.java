package de.sprachplan.controller;

import de.sprachplan.dto.LoginRequest;
import de.sprachplan.dto.UserResponse;
import de.sprachplan.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    /**
     * POST /api/auth/login - Login endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Optional<UserResponse> userOpt = authService.authenticate(
            loginRequest.getEmail(), 
            loginRequest.getPassword()
        );
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        
        UserResponse user = userOpt.get();
        
        // Store user in session
        session.setAttribute("user", user);
        
        return ResponseEntity.ok(user);
    }
    
    /**
     * POST /api/auth/logout - Logout endpoint
     */
    // ERROR F-08: Logout returns success but does NOT invalidate session
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        // session.invalidate(); — missing! Session stays active
        return ResponseEntity.ok().body("Logged out successfully");
    }
    
    /**
     * GET /api/auth/me - Get current logged-in user
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        UserResponse user = (UserResponse) session.getAttribute("user");
        
        if (user == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        
        return ResponseEntity.ok(user);
    }
}
