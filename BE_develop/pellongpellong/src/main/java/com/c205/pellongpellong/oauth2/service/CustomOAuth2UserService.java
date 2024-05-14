package com.c205.pellongpellong.oauth2.service;

import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.oauth2.exception.OAuth2AuthenticationProcessingException;
import com.c205.pellongpellong.oauth2.user.OAuth2UserInfo;
import com.c205.pellongpellong.oauth2.user.OAuth2UserInfoFactory;
import com.c205.pellongpellong.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        saveOrUpdate(oAuth2UserRequest, oAuth2User);
//        return oAuth2User;

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId();

        String accessToken = userRequest.getAccessToken().getTokenValue();

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId,
                accessToken,
                oAuth2User.getAttributes());

        // OAuth2UserInfo field value validation
        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        return new OAuth2UserPrincipal(oAuth2UserInfo);
    }

    private Member saveOrUpdate(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId();

        String accessToken = userRequest.getAccessToken().getTokenValue();

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId,
                accessToken,
                oAuth2User.getAttributes());

        // OAuth2UserInfo에서 이메일 정보 가져오기
        String email = oAuth2UserInfo.getEmail();

        // OAuth2UserInfo field value validation
        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        // 기존에 저장된 사용자인지 확인하기
        Optional<Member> existingMemberOptional = memberRepository.findByEmail(email);
        if (existingMemberOptional.isPresent()) {
            Member existingMember = existingMemberOptional.get();
            String nickname = oAuth2UserInfo.getNickname();
            if(nickname == null) {
                // nickname이 null이면 name을 가져와서 설정
                nickname = oAuth2UserInfo.getName();
            }
            existingMember.setNickname(nickname);
            existingMember.setProfileImg(oAuth2UserInfo.getProfileImageUrl());
            return memberRepository.save(existingMember);
        } else {
            // 새로운 사용자라면 엔티티에 저장
            String nickname = oAuth2UserInfo.getNickname();
            if (nickname == null) {
                // nickname이 null이면 name을 가져와서 설정
                nickname = oAuth2UserInfo.getName();
            }
            Member newMember = Member.builder()
                    .email(oAuth2UserInfo.getEmail())
                    .nickname(nickname)
                    .profileImg(oAuth2UserInfo.getProfileImageUrl())
                    .build();

            return memberRepository.save(newMember);
        }
    }
}