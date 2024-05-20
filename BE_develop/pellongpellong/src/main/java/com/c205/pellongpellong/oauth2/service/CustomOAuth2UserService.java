package com.c205.pellongpellong.oauth2.service;

import com.c205.pellongpellong.controller.*;
import com.c205.pellongpellong.entity.Member;
import com.c205.pellongpellong.oauth2.exception.OAuth2AuthenticationProcessingException;
import com.c205.pellongpellong.oauth2.user.OAuth2UserInfo;
import com.c205.pellongpellong.oauth2.user.OAuth2UserInfoFactory;
import com.c205.pellongpellong.repository.MemberRepository;
import com.c205.pellongpellong.service.LearningProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final RankController rankController;
    private final MemberBadgeController memberBadgeController;
    private final DailyQuestController dailyQuestController;
    private final MemberVariableController memberVariableController;
    private final RedisTemplate<String, String> redisTemplate;
    private final LearningProgressService learningProgressService;
    private final ExpController expController;
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
            // 기존 사용자가 있으면 닉네임과 프로필 이미지를 업데이트
            Member existingMember = existingMemberOptional.get();
            String newNickname = oAuth2UserInfo.getNickname();
            if (newNickname == null) {
                newNickname = oAuth2UserInfo.getName();  // nickname이 null이면 name으로 대체
            }
            existingMember.setNickname(newNickname);
            existingMember.setProfileImg(oAuth2UserInfo.getProfileImageUrl());
            memberRepository.save(existingMember);  // 변경된 정보 저장

            // 기존 사용자 로그인시 출석체크 경험치 부여할지 말지 체크
            // 현재 일시 가져오기
            LocalDateTime currentDateTime = LocalDateTime.now();

            // 기존 로그인 이력 가져오기
            LocalDateTime lastLoginDateTime = memberVariableController.getLoginHistoryByMemberId(existingMember.getMemberId());

            // 로그인 이력이 없는 경우 또는 마지막 로그인 날짜가 오늘과 같은 경우에는 최근 로그인 일시만 업데이트
            if (lastLoginDateTime == null || lastLoginDateTime.toLocalDate().isEqual(currentDateTime.toLocalDate())) {
                memberVariableController.updateLoginTime(existingMember.getMemberId());

            } else { // 마지막 로그인 날짜가 오늘이 아닌 경우에는 경험치 적립 및 최근 로그인 일시 업데이트

                expController.earnAttendanceExp(existingMember.getMemberId());
                memberVariableController.updateLoginTime(existingMember.getMemberId());

            }
            return existingMember;

        } else {
            // 새로운 사용자라면 엔티티에 저장
            String nickname = oAuth2UserInfo.getNickname();
            if (nickname == null) {
                // nickname이 null이면 name을 가져와서 설정
                nickname = oAuth2UserInfo.getName();
            }
            Member newMember = Member.builder()
                    .email(email)
                    .nickname(nickname)
                    .profileImg(oAuth2UserInfo.getProfileImageUrl())
                    .build();

            // 새로운 멤버를 저장합니다.
            Member savedMember = memberRepository.save(newMember);

            // 저장된 멤버의 ID를 사용하여 여러 메소드를 호출합니다.
            rankController.addRank(savedMember.getMemberId());
            memberBadgeController.addMemberBadge(savedMember.getMemberId());
            dailyQuestController.addDailyQuest(savedMember.getMemberId());
            memberVariableController.addMemberVariable(savedMember.getMemberId());
            redisTemplate.opsForZSet().incrementScore("ranking", String.valueOf(savedMember.getMemberId()), 0);
            learningProgressService.createLearningProgress(savedMember.getMemberId());

            return savedMember;

        }
    }
}
