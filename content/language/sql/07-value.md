---
title: 数值处理
index: Language.SQL.Syntax
---

### 计算平均值

`null` 值会被忽略，10，20，null => 15

```sql
select avg(sal) as avg_sal
from emp

-- deptno 每个编号下的平均工资

select deptno, avg(sal) as avg_sal
from emp
group by deptno
```

### 最大值和最小值

```sql
select min(sal) as min_sal, max(sal) as max_sal
from emp
```

### 求和

```sql
select deptno, sum(sal) as total_for_dept
from emp
group by deptno
```

### 计算行数

```sql
select deptno, count(*)
from emp
group by deptno
```

### 计算非Null值的个数

遇到Null值会跳过，不计数

``` sql
select count(comm)
from emp
```

### 累计求和

``` sql
-- DB2 Oracle
select 
    ename, 
    sal,
    sum(sal) over (order by sal, empno) as running_total
from
    emp
order by 2

-- MySQL, PostgreSQL, SQL Server
select 
    e.ename, 
    e.sal,
    (
        select sum(d.sal) 
        from emp d
        where d.empno <= e.empno
    ) as running_total
from emp e
order by 3

-- DB2, Oracle
select 
    empno, 
    sal,
    -- empno 有重复时会影响求和
    sum(sal) over (order by sal, empno) as running_total,
from 
    emp
order by 2

```

### 累计乘积

``` sql
-- DB2, Oracle
select 
    empno,
    ename,
    sal,
    exp(sum(ln(sal)) over (order by sal, empno)) as running_prod
from 
    emp
where 
    deptno = 10

-- MySQL, PostgreSQL, SQL Server
select 
    e.empno, 
    e.name, 
    e.sal,
    (
        select
            exp(sum(ln(d.sal)))
        from
            emp d
        where
            d.empno <= e.empno
            and e.deptno = d.deptno
    ) as running_prod
from emp e
where e.deptno = 10

```

### 计算累计差

``` sql
-- DB2 Oracle
select 
    ename,
    sal,
    sum(case when rn = 1 then sal else -sal end)
        over(order by sal, empno) as running_diff
from (
    select 
        empno,
        ename,
        sal,
        row_number() over(order by sal, empno) as rn
    from
        emp
    where 
        deptno = 10
) x

-- MySQL, PostgreSQL, SQL Server
select 
    a.empno,
    a.ename,
    a.sal,
    (
        select
            case when a.empno = min(b.empno) then sum(b.sal)
                 else sum(-b.sal)
            end
        from 
            emp b
        where
            b.empno <= a.empno
            and b.deptno = a.deptno
    ) as rnk
from
    emp a
where
    a.deptno = 10
```

### 计算众数

``` sql
-- MySQL, PostgreSQL
select sal
from emp
where deptno = 20
group by sal
having count(*) >= all(
    select count(*)
    from emp
    where deptno = 20
    group by sal
)
-- DB2 SQL Server
select sal
from (
    select 
        sal,
        dense_rank() over(order by cnt desc) as rnk
    from (
        select sal, count(*) as cnt
        from emp
        where deptno = 20
        group by sal
    ) x
) y
where rnk = 1

-- Oracle
select max(sal) keep(dense_rank first order by cnt desc) sal
from (
    select sal, count(*) cnt
    from emp
    where deptno = 20
    group by sal
)

```

### 计算中位数

```sql
-- MySQL, Postgre SQL
select avg(sal)
from (
    select e.sal,
    from emp e, emp d
    where 
        e.deptno = d.deptno
        and e.deptno = 20
    group by 
        e.sal
        having sum(case when e.sal = d.sal then 1 else 0 end)
        >= abs(sum(sign(e.sal - d.sal)))
)

-- Oracle
select median(sal)
from emp
where deptno = 20

select 
    percentile_cont(0.5)
    within group(order by sal)
from 
    emp
where
    deptno = 20

```

### 计算百分比

``` sql
-- MySQL, PostgreSQL
select (
    sum(case when deptno = 10 then sal end) / sum(sal)
    ) * 100 as pct
)
from emp

-- DB2, Oracle, SQL Server
select distinct (d10 / total) * 100 as pct
from (
    select 
        deptno,
        sum(sal) over() total,
        sum(sal) over(partition by deptno) d10
    from 
        emp
) x
where deptno = 10
```

### 聚合 Null

``` sql
-- comm 为 null 时行数会被忽略
select avg(coalesce(comm, 0)) as avg_comm
from emp
where deptno = 30
```

### 计算平均值时去掉最大值和最小值


```sql
select avg(sal)
from emp
where sal not in (
    (select max(sal) from emp),
    (select min(sal) from emp)
)
```
