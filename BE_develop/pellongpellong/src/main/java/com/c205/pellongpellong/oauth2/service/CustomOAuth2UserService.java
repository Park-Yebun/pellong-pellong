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



//@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public CustomOAuth2UserService(MemberRepository memberRepository) {

        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

//        oAuth2User 찍히는 데이터 확인용
//        System.out.println(oAuth2User.getAttributes());

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }

//        String email = oAuth2UserInfo.getEmail();
//        Member existData = memberRepository.findByEmail();
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

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
        Member existingMember = memberRepository.findByEmail(email);
        if (existingMember != null) {
            String nickname = oAuth2UserInfo.getNickname();
            if (nickname == null) {
                // nickname이 null이면 name을 가져와서 설정
                nickname = oAuth2UserInfo.getName();
            }

            // 기존 사용자가 있으면 업데이트
            existingMember.setNickname(nickname);
            existingMember.setProfileImg(oAuth2UserInfo.getProfileImageUrl());
            memberRepository.save(existingMember);
            System.out.println(oAuth2UserInfo);
            System.out.println(existingMember.getMemberId());
            return new OAuth2UserPrincipal(oAuth2UserInfo, existingMember.getMemberId());
//            데이터 확인용 출력
//            System.out.println("이름" + oAuth2UserInfo.getName());
//            System.out.println("닉넴" + oAuth2UserInfo.getNickname());
//            System.out.println("전부" + oAuth2UserInfo.getAttributes());
//            System.out.println("플필" + oAuth2UserInfo.getProfileImageUrl());
//            System.out.println("이멜" + oAuth2UserInfo.getEmail());
//            System.out.println("타입" + oAuth2UserInfo.getClass());


        } else {

            String nickname = oAuth2UserInfo.getNickname();
            if (nickname == null) {
                // nickname이 null이면 name을 가져와서 설정
                nickname = oAuth2UserInfo.getName();
            }

            // 새로운 사용자라면 엔티티에 저장
            existingMember = Member.builder()
                    .email(email)
                    .nickname(nickname)
                    .profileImg(oAuth2UserInfo.getProfileImageUrl())
                    .build();

            memberRepository.save(existingMember);
            System.out.println(oAuth2UserInfo);
            System.out.println(existingMember.getMemberId());
            return new OAuth2UserPrincipal(oAuth2UserInfo, existingMember.getMemberId());

        }

    }
}

