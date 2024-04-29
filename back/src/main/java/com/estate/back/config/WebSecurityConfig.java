package com.estate.back.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.estate.back.filter.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

//# Spring Web Security 설정
// - Basic 인증 미사용
// - CSRF 정책 미사용
// - Session 생성 정책 미사용
// - CORS 정책 (모든 출처 - 모든 메서드 - 모든 패턴 허용)
// JwtAuthenticationFilter 추가 (UsernamePasswordAuthenticationFilter 이전에 추가)
@Configurable
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        
        httpSecurity
            // Basic 인증 미사용
            .httpBasic(HttpBasicConfigurer::disable)
            // CSRF 정책 미사용
            .csrf(CsrfConfigurer::disable)
            // Session 생성 정책 미사용
            .sessionManagement(sessionManagement -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .cors(cors -> cors
                .configurationSource(corsconfigurationSource())
            )
            .oauth2Login(oauth2 -> oauth2
            .authorizationEndpoint(endpoint -> endpoint.baseUri("/api/v1/auth/oauth2"))
                .redirectionEndpoint(endpoint -> endpoint.baseUri
                ("/oauth2/callback/*")) 
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

            return httpSecurity.build();
        }
    
        // CORS 정책 설정
        @Bean
        protected CorsConfigurationSource corsconfigurationSource() {
            
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.addAllowedOrigin("*");
            configuration.addAllowedHeader("*");
            configuration.addAllowedMethod("*");

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);

            return source;

        }


}
