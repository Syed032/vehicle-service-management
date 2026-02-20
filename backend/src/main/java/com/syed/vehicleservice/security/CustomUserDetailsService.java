package com.syed.vehicleservice.security;

import com.syed.vehicleservice.entity.User;
import com.syed.vehicleservice.dao.UserDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao; 

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        //  Fetch user from DB using email
        User user = userDao.getUserByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Return Spring Security User object
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),                    
                user.getPassword(),                 
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}
