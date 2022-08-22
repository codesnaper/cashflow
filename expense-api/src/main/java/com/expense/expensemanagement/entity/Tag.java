package com.expense.expensemanagement.entity;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name ="em_tag_t")
@Data
@ToString
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false,unique = true)
    private String name;

    @Column(name ="value", nullable = false, unique = false)
    private String value;

    @CreatedDate
    private Date createdDate;

    @Column
    private Date updatedDate = new Date();

    @Column
    private String userId;

    @OneToMany( targetEntity = TagMapping.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", referencedColumnName = "id")
    private List<TagMapping> tagMappings;

}