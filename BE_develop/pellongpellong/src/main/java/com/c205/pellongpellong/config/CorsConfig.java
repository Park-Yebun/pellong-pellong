package com.c205.pellongpellong.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // 모든 오리진 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600); // pre-flight request의 캐시 시간
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000", "https://saturituri.com") // 여러 오리진을 배열로 지정
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true) // 쿠키와 인증 헤더를 허용
//                .maxAge(3600); // pre-flight request의 캐시 시간
    }
}
