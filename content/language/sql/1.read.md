---
title: 查询
index: Language.SQL.Syntax
---

[[toc]]

## 行检索 after from(where, limit, order by, group by)

### 筛选行

```sql
select * from emp where deptno = 10
```

### 查找Null

``` sql
select * from emp where comm is null
```

### 多条件检索

``` sql

select * from emp 
where deptno = 10 
      or comm is not null 
      or sal <= 2000 
      and deptno = 20

select ename, job from emp
      -- 范围查找
where deptno in (10, 20)
      -- 模糊查找
	  and (ename like '%I%' or job like '%ER') 
```


### 查询前N行

``` sql
select *
from emp fetch first 5 rows only -- DB2
from emp limit 5 -- MySQL PostgreSQL
from emp where rownum <= 5 -- Oracle

select top 5 * from emp -- SQL Server
```


### 分页查询

``` sql

-- 无总数
-- MySQL
select * 
from emp limit 5 offset 10 

-- 有总数
-- MySQL
select SQL_CALC_FOUND_ROWS *
from emp
limit 5, 10

select FOUND_ROWS as total
```


### 查询随机N行

``` sql
select name, job
from emp
order by rand() fetch first 5 rows only -- DB2
order by rand() limit 5 -- MySQL
order by random() limit 5 -- PostgreSQL

select * 
from (select ename, job from emp order by dbms_random.value())
where rownum <= 5 -- Oracle

select top 5 ename, job
from emp
order by newid() -- SQL Server
```


## 列检索 select


### 按列筛选

``` sql
select ename, deptno, sal from emp
```

### 别名

``` sql
select sal as salary, comm as commisson
from emp
```

### 串联多列的值

``` sql
select ename || ' WORKS AS A ' || job as msg -- DB2 Oracle PostgreSQL
select concat(ename, ' WORKS AS A ', job) as msg -- MySQL
select ename + ' WORKS AS A ' + job as msg -- SQL Server
from emp
where deptno = 10
```

### SELECT 使用条件

``` sql
select ename, 
	   sal,
	   case when sal <= 2000 then 'UNDERPAID'
		    when sal >= 4000 then 'OVERPAID'
		    else 'OK'
	   end as status
from emp	
```

### 填补缺省

``` sql
select coalesce(comm, 0)
from emp

select case 
	   when comm is not null then comm
	   else 0
	   end
from emp
```

## 联表查询 (left join)



### Notes

- 尽量不要在查询中使用去重 `distinct` ,`union`
- 执行顺序 `where` > `from` > `select`
- 书写顺序 `select` > `from` > `where` > `order by` 

