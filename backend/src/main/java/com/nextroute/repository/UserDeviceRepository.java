package com.nextroute.repository;

import com.nextroute.model.User;
import com.nextroute.model.UserDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDeviceRepository extends JpaRepository<UserDevice, Long> {
    List<UserDevice> findByUserOrderByLastLoginAtAsc(User user);
    Optional<UserDevice> findBySessionId(String sessionId);
    boolean existsBySessionId(String sessionId);
    void deleteBySessionId(String sessionId);
    void deleteByUser(User user);
}
