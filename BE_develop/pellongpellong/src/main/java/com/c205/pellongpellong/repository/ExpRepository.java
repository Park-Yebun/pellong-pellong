package com.c205.pellongpellong.repository;

import com.c205.pellongpellong.entity.Exp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpRepository extends JpaRepository<Exp, Long> {
    List<Exp> findByMember_MemberId(Long memberId);

    @Query(value =  "SELECT dateTable.date AS date, IFNULL(SUM(e.exp), 0) AS dailyExp " +
                    "FROM (SELECT DATE(NOW()) AS date " +
                    "UNION ALL SELECT DATE(NOW() - INTERVAL 1 DAY) " +
                    "UNION ALL SELECT DATE(NOW() - INTERVAL 2 DAY)) AS dateTable " +
                    "LEFT JOIN Exp e ON DATE(e.expAt) = dateTable.date AND e.memberId = :memberId " +
                    "GROUP BY dateTable.date " +
                    "ORDER BY date;", nativeQuery = true)
    List<Object[]> findRecentDailyExp(long memberId);
}
