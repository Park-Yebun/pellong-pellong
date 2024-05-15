package com.c205.pellongpellong.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
@EnableRedisRepositories
public class RedisConfig {

    @Value("${spring.data.redis.url}")
    private URI redisUrl;
//    @Value("${spring.data.redis.host}")
//    private String host;
//
//
//    @Value("${spring.data.redis.port}")
//    private int port;
//
    @Value("${spring.data.redis.password}")
    private String password;
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisConfiguration = new RedisStandaloneConfiguration();
       try {
           URI redisUri = redisUrl;
           redisConfiguration.setHostName(redisUri.getHost());
           redisConfiguration.setPort(redisUri.getPort());
       } catch (IllegalArgumentException e) {
           throw new IllegalArgumentException("redis url이 올바르지 않습니다.");
       }

        redisConfiguration.setPassword(password);
        return new LettuceConnectionFactory(redisConfiguration);
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer()); //key 깨짐 방지
        redisTemplate.setValueSerializer(new StringRedisSerializer());//value 깨짐 방지;
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }
}
