package com.example.todo.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "todolist")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createTime"},
        allowGetters = true)
public class Todo {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	 	@Column
	    private String title;

		@Column(nullable = true)
	    private String relation;

	    @Column(nullable = false, updatable = false)
	    @CreationTimestamp
	    private LocalDateTime createTime;
	    

		@Column(nullable = true)
	    @LastModifiedDate
	    private LocalDateTime completeTime;


	    @Column(nullable = false, columnDefinition = "number(255) default 0") 
	    private int completeYN;
	    

	    Todo(){
	    	createTime = LocalDateTime.now();
	    }
	    
	    public Todo(String title, String relation){
	    	this.title = title;
	    	this.relation = relation;
	    }
	    
	    
	    
	    public Long getId() {
			return id;
		}


		public void setId(Long id) {
			this.id = id;
		}


		public String getTitle() {
			return title;
		}


		public void setTitle(String title) {
			this.title = title;
		}


		public String getRelation() {
			return relation;
		}


		public void setRelation(String relation) {
			this.relation = relation;
		}


		public LocalDateTime getCreateTime() {
			return createTime;
		}


		public void setCreateTime(LocalDateTime createTime) {
			this.createTime = createTime;
		}


		public LocalDateTime getCompleteTime() {
			return completeTime;
		}


		public void setCompleteTime(LocalDateTime completeTime) {
			this.completeTime = completeTime;
		}


		public int getCompleteYN() {
			return completeYN;
		}


		public void setCompleteYN(int completeYN) {
			this.completeYN = completeYN;
		}

}
