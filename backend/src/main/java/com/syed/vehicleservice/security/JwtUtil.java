package com.syed.vehicleservice.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	// Secret Key (Move to environment variable in production)
	private static final String SECRET_KEY = "mysecretkeymysecretkeymysecretkeymysecretkey";

	// Token validity (1 hour)
	private static final long EXPIRATION_TIME = 1000 * 60 * 60;
//    private static final long EXPIRATION_TIME=10000;

	// Generate Signing Key
	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}

	// Generate JWT Token
	public String generateToken(int id, String email, String role) {

		return Jwts.builder().setSubject(email).claim("id", id).claim("role", role).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
	}

	// Extract Email (Subject)
	public String extractEmail(String token) {
		return getClaims(token).getSubject();
	}

	// Extract User ID
	public Integer extractId(String token) {
		return getClaims(token).get("id", Integer.class);
	}

	// Extract Role
	public String extractRole(String token) {
		return getClaims(token).get("role", String.class);
	}

	// Validate Token
	public boolean validateToken(String token, String email) {
		return extractEmail(token).equals(email) && !isTokenExpired(token);
	}

	// Check Expiration
	private boolean isTokenExpired(String token) {
		return getClaims(token).getExpiration().before(new Date());
	}

	// Parse Claims
	private Claims getClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
	}
}
