package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Bank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface BankDAO extends PagingAndSortingRepository<Bank, Long> {

    Page<Bank> findByUserId(String userId, Pageable pageable);

    Optional<Bank> findByUserIdAndId(String userId, long id);
}
