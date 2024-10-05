---
title: 插入、更新和删除
index: Language.SQL.Syntax
---

[[toc]]

## 插入新纪录

### Normal

```sql
-- 不指定字段则需要按顺序填充所有字段

insert into dept (deptno, dname, loc)
values (50, 'PROGRAMMING', 'BALTIMORE')

-- 多行插入 DB2 MySQL
insert into dept (deptno, dname, loc)
values (10, 'A', 'B'),
	   (20, 'C', 'D')
```

### 设置默认值

```sql
create table D (id integer default 0, foo varchar(10))

insert into D (name) values ('Bar')
```

### 使用Null覆盖默认值

```sql
create table D (id integer default 0, foo varchar(10))

insert into D (id, foo) values (null, 'Brighten')
```

### 禁止插入特定列 

```sql

-- 不开放原始表的插入权限

create view new_emps as 
select empno, ename, job 
from emp

insert into new_emps (empno, ename, job)
values (1, 'Jonathan', 'Editor')

```

---

## 更新记录

### Normal

``` sql
update emp
set sal = sal * 1.10
where deptno = 20
```

### 另一个表有相关数据时更新记录

``` sql
update emp
set sal = sal * 1.20
where exists (
	select null 
	from emp_bonus
	where emp.empno = emp_bonus.empno
)
```

### 使用另一个表的数据更新记录

```sql
-- DB2 MySQL
update emp e 
set (e.sal, e.com) = (
	select ns.sal, ns.sal / 2
	from new_sal ns
	where ns.deptno = e.deptno
) 
where exists (
	select null
	from new_sal ns
	where ns.detpno = e.deptno
)

-- Oracle
update (
	select e.sal as emp_sal, 
		   e.comm as emp_comm,
		   ns.sal as ns_sal,
		   ns.sal/2 as ns_comm
	from emp e, new_sal ns
	where e.deptno = ns.deptno
) set emp_sal = ns_sal, emp_comm = ns_comm

-- ProgresSQL
update emp
set sal = ns.sal,
    comm = ns.sal / 2
from new_sal ns
where ns.deptno = emp.deptno

-- SQL Server
update e
set e.sal = ns.sal,
	e.comm = ns.sal / 2
from emp e, new_sal ns
where ns.deptno = e.deptno
```

#### 合并记录^

---

## 删除记录


### 删除全表记录

```sql
delete from emp
```

### 删除指定条件记录

``` sql
delete from emp where deptno = 10
```

### 删除违反参照完整性的记录

``` sql
-- emp 数据中包含 dept 不存在的 deptno 则删除
delete from emp
where not exist (
	select * from dept
	where dept.deptno = emp.deptno
)

delete from emp
where deptno not in (select deptno from dept)
```

### 删除重复记录

``` sql
delete from dupes
where id not in (
	select min(id)
	from dupes
	group by name
)
```

#### 删除被其他表参照的记录^

``` sql
delete from emp
where deptno in (
	select deptno
	from dept_accidents
	group by deptno
	having count(*) >= 3
)
```

