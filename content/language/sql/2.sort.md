---
title: 排序
index: Language.SQL.Syntax
---

[[toc]]

## 指定列排序

``` sql
select ename, job, sal
from emp
where deptno = 10

---
order by sal
order by sal asc
---
order by sal desc
order by 3 desc -- sal
```


## 多列排序

``` sql
select empno, deptno, sal, ename, job
from emp
order by deptno, sal desc
```

## 按字符串最后两位排序


``` sql
select ename, job
from emp
order by substr(job, length(job)-2) -- DB2 MySQL Oracle PostgreSQL
order by substring(job, len(job)-2, 2) -- SQL Server
```

### 排序时处理 Null

```sql
select ename, sal, comm
from (
	select ename, sal, comm,
		   case when comm is null then 0 else 1 end as is_null
	from emp
) order by is_null desc, comm
```

## 动态条件排序

``` sql
select ename, sal, job, comm
from emp
order by 
    case when job = 'SALESMAN' 
        then comm 
        else sal 
    end
```