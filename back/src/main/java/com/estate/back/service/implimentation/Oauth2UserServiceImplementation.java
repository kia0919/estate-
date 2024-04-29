package com.estate.back.service.implimentation;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
// DefaultOAuth2UserService확장
public class Oauth2UserServiceImplementation extends DefaultOAuth2UserService {
    
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{

        OAuth2User oAuth2User = super.loadUser(userRequest);
        String oauthClientName = userRequest
        .getClientRegistration()
        .getClientName()
        .toUpperCase();

        // System.out.println(oauthClientName);

        // try {
        //     // writeValueAsString: 객체를 문자열로 바꾸는 작업
        //     System.out.println(
        //     new ObjectMapper()
        //     .writeValueAsString(oAuth2User.getAttributes()));
        // } catch (Exception exception) {
        //     exception.printStackTrace();
        // }

        if (oauthClientName.equals("KAKAO")) {
            
        }
        if(oauthClientName.equals("NAVER")) {

        }

        return oAuth2User;

    }
}