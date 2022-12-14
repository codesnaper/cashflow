package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.CategoryDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.LimitModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component("limitConversion")
public class LimitConversion implements EntityModalConversion<Limit, LimitModel> {

    @Autowired
    @Qualifier("AccountEntityModel")
    EntityModalConversion<Account, AccountModel> accountConversion;

    @Autowired
    @Qualifier("CategoryConversion")
    EntityModalConversion<Category, com.expense.expensemanagement.model.Category> categoryConversion;

    @Autowired
    AccountDAO accountDAO;

    @Autowired
    CategoryDao categoryDao;


    @Override
    public LimitModel getModel(Limit limit) {
        LimitModel limitModel=new LimitModel();
        limitModel.setId(limit.getId());
        limitModel.setAccountId(limit.getAccountId());
        limitModel.setName(limit.getName());
        limitModel.setDescription(limit.getDescription());
        limitModel.setCategoryId(limit.getCategoryId());
        limitModel.setMaxAmount(limit.getMaxAmount().longValue());
        limitModel.setMinAmount(limit.getMinAmount().longValue());
        limitModel.setPriority(limit.getPriority());
        limitModel.setResetRecursively(limit.getResetRecursively());
        limitModel.setUserid(limit.getUserid());
        limitModel.setUsedAmount(limit.getUsedAmount().longValue());
        limitModel.setThresoldWarningAmount(limit.getThresoldWarningAmount());
        limitModel.setCategory(categoryConversion.getModel(limit.getCategory()));
        limitModel.setAccount(accountConversion.getModel(limit.getAccount()));
        return limitModel;
    }

    @Override
    public Limit getEntity(LimitModel limitModel) {
        Limit limit=new Limit();
        limit.setId(limitModel.getId());
         Account account=accountDAO.findById(limitModel.getAccountId()).orElse(new Account());
        limit.setAccount(account);
        limit.setName(limitModel.getName());
        limit.setDescription(limitModel.getDescription());
        limit.setMaxAmount(new BigDecimal(limitModel.getMaxAmount()));
        limit.setMinAmount(new BigDecimal(limitModel.getMinAmount()));
        limit.setPriority(limitModel.getPriority());
        limit.setResetRecursively(limitModel.getResetRecursively());
        limit.setUserid(limitModel.getUserid());
        limit.setUsedAmount(new BigDecimal(limitModel.getUsedAmount()));
        limit.setThresoldWarningAmount(limitModel.getThresoldWarningAmount());
        Category category = categoryDao.findById(limitModel.getCategoryId()).orElse(new Category());
        limit.setCategory(category);
        return limit;
    }
}
