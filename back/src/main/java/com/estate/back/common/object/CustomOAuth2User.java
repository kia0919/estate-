package com.estate.back.common.object;

import java.util.Collections;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

//# 

//# CustomOAuth2User클래스는 인터페이스 OAuth2User를 정의
public class CustomOAuth2User implements OAuth2User {
    // 사용자 id저장
    private String id;
    // 사용자 속성 저장
    private Map<String, Object> attributes;
    // 사용자 권한을 저장하는 컬렉션을 GrantedAuthority객체의 컬렉션으로 관리?
    private Collection<? extends GrantedAuthority> authorities;

    //# 생성자
    // 사용자의 id속성을 받아옴
    public CustomOAuth2User(String id, Map<String, Object> attributes) {
        this.id = id;
        this.attributes = attributes;
        // 사용자 권한은 ROLE_USER으로 지정
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }
    
    //# 메서드 / 속성 반환
    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    //# 메서드 / 권한 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    //# 메서드 / 사용자 이름 반환
    @Override
    public String getName() {
        return this.id;
    }
    
}