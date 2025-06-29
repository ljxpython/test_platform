# 🔧 故障排除

遇到问题不要慌！本文档汇总了巧克力测试平台常见问题的解决方案，让你快速定位和解决问题。

## 🎯 故障排除流程

### 问题诊断步骤
1. **确认问题现象** - 详细描述问题表现
2. **检查系统状态** - 查看服务运行状态
3. **查看日志信息** - 分析错误日志
4. **定位问题原因** - 根据日志定位根因
5. **应用解决方案** - 执行修复操作
6. **验证修复效果** - 确认问题已解决

### 常用诊断命令
```bash
# 检查服务状态
sudo systemctl status nginx
sudo systemctl status mysql
sudo systemctl status redis
sudo systemctl status test-platform-backend

# 检查端口监听
sudo netstat -tlnp | grep -E ':(80|443|3000|5000|3306|6379)'

# 检查进程
ps aux | grep -E '(nginx|gunicorn|celery|mysql|redis)'

# 检查磁盘空间
df -h

# 检查内存使用
free -h

# 检查系统负载
top
htop
```

## 🚨 常见问题及解决方案

### 1. 服务无法启动

#### 问题现象
- 服务启动失败
- 端口无法绑定
- 进程异常退出

#### 解决方案

**检查端口占用**
```bash
# 查看端口占用
sudo lsof -i :5000
sudo netstat -tlnp | grep :5000

# 杀死占用进程
sudo kill -9 <PID>

# 或者修改配置使用其他端口
vim config.py  # 修改端口配置
```

**检查权限问题**
```bash
# 检查文件权限
ls -la /opt/test-platform-backend/

# 修改权限
sudo chown -R www-data:www-data /opt/test-platform-backend/
sudo chmod -R 755 /opt/test-platform-backend/

# 检查SELinux状态 (CentOS/RHEL)
getenforce
sudo setsebool -P httpd_can_network_connect 1
```

**检查配置文件**
```bash
# 验证Python配置
python -c "import config; print('Config OK')"

# 验证Nginx配置
sudo nginx -t

# 检查systemd服务配置
sudo systemctl cat test-platform-backend
```

### 2. 数据库连接问题

#### 问题现象
- 数据库连接超时
- 认证失败
- 连接被拒绝

#### 解决方案

**检查MySQL服务**
```bash
# 检查MySQL状态
sudo systemctl status mysql

# 重启MySQL
sudo systemctl restart mysql

# 检查MySQL错误日志
sudo tail -f /var/log/mysql/error.log
```

**检查数据库连接**
```bash
# 测试数据库连接
mysql -u test_user -p -h localhost test_platform

# 检查用户权限
mysql -u root -p
SHOW GRANTS FOR 'test_user'@'localhost';
```

**修复连接问题**
```sql
-- 重新创建用户和授权
DROP USER IF EXISTS 'test_user'@'localhost';
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'new_password';
GRANT ALL PRIVILEGES ON test_platform.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;
```

**检查防火墙设置**
```bash
# Ubuntu/Debian
sudo ufw status
sudo ufw allow 3306/tcp

# CentOS/RHEL
sudo firewall-cmd --list-all
sudo firewall-cmd --add-port=3306/tcp --permanent
sudo firewall-cmd --reload
```

### 3. Redis连接问题

#### 问题现象
- Redis连接失败
- 认证错误
- 超时错误

#### 解决方案

**检查Redis服务**
```bash
# 检查Redis状态
sudo systemctl status redis

# 重启Redis
sudo systemctl restart redis

# 测试Redis连接
redis-cli ping
redis-cli -a your_password ping
```

**检查Redis配置**
```bash
# 查看Redis配置
redis-cli CONFIG GET "*"

# 检查密码设置
redis-cli CONFIG GET requirepass

# 修改Redis配置
sudo vim /etc/redis/redis.conf
# 取消注释并设置密码
requirepass your_password
```

**检查网络连接**
```bash
# 检查Redis端口
sudo netstat -tlnp | grep :6379

# 测试网络连通性
telnet localhost 6379
```

### 4. 前端页面问题

#### 问题现象
- 页面无法加载
- 白屏问题
- 资源加载失败

#### 解决方案

**检查Nginx配置**
```bash
# 测试Nginx配置
sudo nginx -t

# 重新加载配置
sudo nginx -s reload

# 检查Nginx错误日志
sudo tail -f /var/log/nginx/error.log
```

**检查静态文件**
```bash
# 检查构建产物
ls -la /opt/test-platform-frontend/dist/

# 重新构建前端
cd /opt/test-platform-frontend/
npm run build

# 检查文件权限
sudo chown -R www-data:www-data /opt/test-platform-frontend/dist/
```

**检查代理配置**
```nginx
# 检查API代理配置
location /api/ {
    proxy_pass http://127.0.0.1:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # 添加超时配置
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

### 5. API接口问题

#### 问题现象
- 接口返回500错误
- 接口响应超时
- 认证失败

#### 解决方案

**检查后端日志**
```bash
# 查看应用日志
sudo tail -f /var/log/test-platform/app.log

# 查看systemd日志
sudo journalctl -u test-platform-backend -f

# 查看Gunicorn日志
sudo tail -f /var/log/gunicorn/access.log
sudo tail -f /var/log/gunicorn/error.log
```

**检查API健康状态**
```bash
# 测试健康检查接口
curl -X GET http://localhost:5000/api/health

# 测试具体API接口
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**检查认证问题**
```bash
# 检查JWT配置
python -c "
import jwt
from config import Config
print('JWT Secret:', Config.JWT_SECRET_KEY)
"

# 测试Token生成
python -c "
import jwt
from datetime import datetime, timedelta
token = jwt.encode({
    'user_id': 1,
    'exp': datetime.utcnow() + timedelta(hours=1)
}, 'your-secret-key')
print('Token:', token)
"
```

### 6. Celery任务问题

#### 问题现象
- 任务执行失败
- 任务队列堆积
- Worker进程异常

#### 解决方案

**检查Celery服务**
```bash
# 检查Celery Worker状态
sudo systemctl status test-platform-celery

# 查看Celery日志
sudo journalctl -u test-platform-celery -f

# 手动启动Celery Worker
cd /opt/test-platform-backend/
source venv/bin/activate
celery -A app.celery worker --loglevel=debug
```

**检查任务队列**
```bash
# 进入Redis查看队列
redis-cli
LLEN celery
LRANGE celery 0 -1

# 清空队列 (谨慎操作)
FLUSHDB
```

**检查任务状态**
```python
# 在Python中检查任务状态
from app import celery
from celery import current_app

# 查看活跃任务
active_tasks = current_app.control.inspect().active()
print(active_tasks)

# 查看注册的任务
registered_tasks = current_app.control.inspect().registered()
print(registered_tasks)
```

### 7. 性能问题

#### 问题现象
- 响应时间过长
- 系统负载过高
- 内存使用过多

#### 解决方案

**检查系统资源**
```bash
# 检查CPU使用率
top
htop

# 检查内存使用
free -h
cat /proc/meminfo

# 检查磁盘IO
iostat -x 1

# 检查网络连接
ss -tuln
netstat -an | grep ESTABLISHED | wc -l
```

**数据库性能优化**
```sql
-- 查看慢查询
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- 查看进程列表
SHOW PROCESSLIST;

-- 查看表状态
SHOW TABLE STATUS;

-- 分析查询
EXPLAIN SELECT * FROM test_cases WHERE module_id = 1;
```

**应用性能优化**
```bash
# 增加Gunicorn Worker数量
vim /etc/systemd/system/test-platform-backend.service
# 修改: ExecStart=.../gunicorn -w 8 -b 127.0.0.1:5000 app:app

# 重启服务
sudo systemctl daemon-reload
sudo systemctl restart test-platform-backend

# 配置Redis内存限制
redis-cli CONFIG SET maxmemory 2gb
redis-cli CONFIG SET maxmemory-policy allkeys-lru
```

## 🔍 日志分析

### 日志文件位置
```bash
# 应用日志
/var/log/test-platform/app.log
/var/log/test-platform/celery.log

# 系统日志
/var/log/nginx/access.log
/var/log/nginx/error.log
/var/log/mysql/error.log
/var/log/redis/redis-server.log

# Systemd日志
journalctl -u test-platform-backend
journalctl -u test-platform-celery
journalctl -u nginx
journalctl -u mysql
```

### 日志分析技巧
```bash
# 查看最新错误
tail -f /var/log/test-platform/app.log | grep ERROR

# 统计错误类型
grep ERROR /var/log/test-platform/app.log | awk '{print $4}' | sort | uniq -c

# 查看特定时间段的日志
grep "2024-01-01 14:" /var/log/test-platform/app.log

# 分析访问日志
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10
```

## 🛠️ 维护工具

### 健康检查脚本
```bash
#!/bin/bash
# health_check.sh

echo "=== 系统健康检查 ==="

# 检查服务状态
services=("nginx" "mysql" "redis" "test-platform-backend" "test-platform-celery")
for service in "${services[@]}"; do
    if systemctl is-active --quiet $service; then
        echo "✅ $service: 运行中"
    else
        echo "❌ $service: 已停止"
    fi
done

# 检查端口
ports=(80 443 3306 5000 6379)
for port in "${ports[@]}"; do
    if netstat -tlnp | grep -q ":$port "; then
        echo "✅ 端口 $port: 监听中"
    else
        echo "❌ 端口 $port: 未监听"
    fi
done

# 检查磁盘空间
disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $disk_usage -lt 80 ]; then
    echo "✅ 磁盘使用率: ${disk_usage}%"
else
    echo "⚠️ 磁盘使用率过高: ${disk_usage}%"
fi

# 检查内存使用
mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ $mem_usage -lt 80 ]; then
    echo "✅ 内存使用率: ${mem_usage}%"
else
    echo "⚠️ 内存使用率过高: ${mem_usage}%"
fi
```

### 自动重启脚本
```bash
#!/bin/bash
# auto_restart.sh

# 检查服务并自动重启
check_and_restart() {
    service_name=$1
    if ! systemctl is-active --quiet $service_name; then
        echo "$(date): $service_name 已停止，正在重启..."
        systemctl restart $service_name
        sleep 5
        if systemctl is-active --quiet $service_name; then
            echo "$(date): $service_name 重启成功"
        else
            echo "$(date): $service_name 重启失败"
        fi
    fi
}

# 检查关键服务
check_and_restart "test-platform-backend"
check_and_restart "test-platform-celery"
check_and_restart "nginx"
check_and_restart "mysql"
check_and_restart "redis"
```

## 📞 获取帮助

### 联系方式
- 📧 技术支持邮箱: support@example.com
- 💬 在线文档: https://docs.example.com
- 🐛 问题反馈: https://github.com/your-org/test-platform/issues

### 提交问题时请包含
1. **问题描述**: 详细描述问题现象
2. **环境信息**: 操作系统、版本信息
3. **错误日志**: 相关的错误日志
4. **复现步骤**: 问题的复现步骤
5. **配置信息**: 相关的配置文件内容

---

> 🎉 **故障排除专家！** 你已经掌握了解决各种问题的技能。记住，遇到问题时保持冷静，按步骤排查，大部分问题都能迎刃而解！
