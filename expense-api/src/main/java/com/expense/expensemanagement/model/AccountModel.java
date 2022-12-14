package com.expense.expensemanagement.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
public class AccountModel {
    private long id;

    private String name;

    private String accountNumber;

    private double amount;

    @DateTimeFormat(pattern = "dd.MM.yyyy", iso = DateTimeFormat.ISO.DATE)
    private Date openDate;

    @DateTimeFormat(pattern = "dd.MM.yyyy", iso = DateTimeFormat.ISO.DATE)
    private Date endDate;

    private Date createdDate;

    private Date updatedDate = new Date();

    private String userId;

    private long bankId;

    private List<TagModel> tags;

    private BankModel bank;
}
