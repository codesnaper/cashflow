package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;

@Data
public class ExpenditureModel {

    private long id;

    private String description;

    private String name;

    private double amount;

    private ExpenditureType type;

    private LimitModel limit;

    private AccountModel account;

    private AccountModel fromAccount;

    private Category category;

    private Date date;

    @JsonIgnore
    private transient String userId;

}
