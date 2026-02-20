package com.syed.vehicleservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = authHeader.substring(7);

		try {

			String email = jwtUtil.extractEmail(token);

			if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

				String role = jwtUtil.extractRole(token);

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,
						null, Collections.singletonList(new SimpleGrantedAuthority(role)));

				SecurityContextHolder.getContext().setAuthentication(authentication);
			}

		} catch (ExpiredJwtException ex) {

			// Token expired
			SecurityContextHolder.clearContext();

		} catch (JwtException | IllegalArgumentException ex) {

			// Invalid token
			SecurityContextHolder.clearContext();
		}

		filterChain.doFilter(request, response);
	}
}
