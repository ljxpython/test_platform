# 📦 安装指南

欢迎来到巧克力测试平台的安装指南！本文档将一步步教你如何安装和部署测试平台，让你的测试环境快速运行起来。

## 🎯 安装概览

### 部署架构
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端服务       │    │   后端服务       │    │   数据库服务     │
│  (React App)    │◄──►│  (Flask API)    │◄──►│ (MySQL+Redis)   │
│  Port: 3000     │    │  Port: 5000     │    │ Port: 3306/6379 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web服务器      │    │   任务队列       │    │   测试引擎       │
│   (Nginx)       │    │   (Celery)      │    │ (Pytest+Locust) │
│   Port: 80/443  │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 系统要求
- **操作系统**: CentOS 7+, Ubuntu 18.04+, macOS 10.15+
- **CPU**: 2核心以上
- **内存**: 4GB以上 (推荐8GB)
- **硬盘**: 50GB以上可用空间
- **网络**: 稳定的互联网连接

## 🚀 快速安装 (Docker方式)

### 1. 安装Docker和Docker Compose
```bash
# CentOS/RHEL
sudo yum install -y docker docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# Ubuntu/Debian
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# macOS
# 下载并安装 Docker Desktop
# https://www.docker.com/products/docker-desktop
```

### 2. 下载项目
```bash
# 创建项目目录
mkdir -p /opt/test-platform
cd /opt/test-platform

# 下载前端项目
git clone https://github.com/your-org/test-platform-frontend.git frontend

# 下载后端项目
git clone https://github.com/ljxpython/flask_platform_srv.git backend
```

### 3. 配置环境变量
```bash
# 复制环境配置文件
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 编辑配置文件
vim backend/.env
vim frontend/.env
```

### 4. 启动服务
```bash
# 使用Docker Compose启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 5. 初始化数据
```bash
# 进入后端容器
docker-compose exec backend bash

# 初始化数据库
python manage.py db upgrade
python manage.py init-data

# 创建管理员用户
python manage.py create-admin --username admin --password admin123
```

### 6. 访问平台
- **前端地址**: http://localhost:3000
- **后端API**: http://localhost:5000
- **管理员账号**: admin / admin123

## 🔧 手动安装

### 1. 环境准备

#### 安装Node.js
```bash
# 使用NodeSource仓库安装Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

#### 安装Python
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y python3.9 python3.9-pip python3.9-venv

# CentOS/RHEL
sudo yum install -y python39 python39-pip

# 验证安装
python3.9 --version
pip3.9 --version
```

#### 安装MySQL
```bash
# Ubuntu/Debian
sudo apt install -y mysql-server mysql-client

# CentOS/RHEL
sudo yum install -y mysql-server mysql

# 启动MySQL服务
sudo systemctl start mysql
sudo systemctl enable mysql

# 安全配置
sudo mysql_secure_installation
```

#### 安装Redis
```bash
# Ubuntu/Debian
sudo apt install -y redis-server

# CentOS/RHEL
sudo yum install -y redis

# 启动Redis服务
sudo systemctl start redis
sudo systemctl enable redis
```

### 2. 数据库配置

#### 创建数据库
```sql
-- 登录MySQL
mysql -u root -p

-- 创建数据库
CREATE DATABASE test_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'test_password';
CREATE USER 'test_user'@'%' IDENTIFIED BY 'test_password';

-- 授权
GRANT ALL PRIVILEGES ON test_platform.* TO 'test_user'@'localhost';
GRANT ALL PRIVILEGES ON test_platform.* TO 'test_user'@'%';

-- 刷新权限
FLUSH PRIVILEGES;

-- 退出
EXIT;
```

#### 配置Redis
```bash
# 编辑Redis配置文件
sudo vim /etc/redis/redis.conf

# 修改以下配置
bind 127.0.0.1
port 6379
requirepass your_redis_password

# 重启Redis服务
sudo systemctl restart redis
```

### 3. 后端安装

#### 下载代码
```bash
cd /opt
git clone https://github.com/ljxpython/flask_platform_srv.git test-platform-backend
cd test-platform-backend
```

#### 创建虚拟环境
```bash
python3.9 -m venv venv
source venv/bin/activate
```

#### 安装依赖
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 配置环境
```bash
# 复制配置文件
cp config.example.py config.py

# 编辑配置文件
vim config.py
```

**config.py 配置示例**:
```python
import os

class Config:
    # 数据库配置
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://test_user:test_password@localhost/test_platform'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Redis配置
    REDIS_URL = 'redis://:your_redis_password@localhost:6379/0'
    
    # JWT配置
    JWT_SECRET_KEY = 'your-jwt-secret-key-here'
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    
    # Celery配置
    CELERY_BROKER_URL = 'redis://:your_redis_password@localhost:6379/1'
    CELERY_RESULT_BACKEND = 'redis://:your_redis_password@localhost:6379/2'

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
```

#### 初始化数据库
```bash
# 初始化数据库
python manage.py db init
python manage.py db migrate -m "Initial migration"
python manage.py db upgrade

# 创建初始数据
python manage.py init-data

# 创建管理员用户
python manage.py create-admin --username admin --password admin123
```

#### 启动后端服务
```bash
# 启动Flask应用
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# 启动Celery Worker (新终端)
celery -A app.celery worker --loglevel=info

# 启动Celery Beat (新终端)
celery -A app.celery beat --loglevel=info
```

### 4. 前端安装

#### 下载代码
```bash
cd /opt
git clone https://github.com/your-org/test-platform-frontend.git test-platform-frontend
cd test-platform-frontend
```

#### 安装依赖
```bash
# 安装pnpm (推荐)
npm install -g pnpm

# 安装项目依赖
pnpm install
```

#### 配置环境
```bash
# 复制配置文件
cp .env.example .env.production

# 编辑配置文件
vim .env.production
```

**.env.production 配置示例**:
```env
# API服务地址
REACT_APP_API_URL=http://your-domain.com:5000

# 环境标识
REACT_APP_ENV=production

# 是否启用Mock数据
REACT_APP_MOCK=false
```

#### 构建前端
```bash
# 构建生产版本
pnpm build

# 构建产物在 dist/ 目录
ls -la dist/
```

### 5. Web服务器配置

#### 安装Nginx
```bash
# Ubuntu/Debian
sudo apt install -y nginx

# CentOS/RHEL
sudo yum install -y nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 配置Nginx
```bash
# 创建配置文件
sudo vim /etc/nginx/sites-available/test-platform
```

**Nginx配置示例**:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    location / {
        root /opt/test-platform-frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 启用配置
```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/test-platform /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载配置
sudo systemctl reload nginx
```

## 🔐 SSL证书配置

### 使用Let's Encrypt
```bash
# 安装Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加以下行
0 12 * * * /usr/bin/certbot renew --quiet
```

### 手动配置SSL
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # 其他配置...
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## 🔧 系统服务配置

### 创建Systemd服务

#### 后端服务
```bash
# 创建服务文件
sudo vim /etc/systemd/system/test-platform-backend.service
```

```ini
[Unit]
Description=Test Platform Backend
After=network.target mysql.service redis.service

[Service]
Type=exec
User=www-data
Group=www-data
WorkingDirectory=/opt/test-platform-backend
Environment=PATH=/opt/test-platform-backend/venv/bin
ExecStart=/opt/test-platform-backend/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 app:app
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### Celery Worker服务
```bash
# 创建服务文件
sudo vim /etc/systemd/system/test-platform-celery.service
```

```ini
[Unit]
Description=Test Platform Celery Worker
After=network.target redis.service

[Service]
Type=exec
User=www-data
Group=www-data
WorkingDirectory=/opt/test-platform-backend
Environment=PATH=/opt/test-platform-backend/venv/bin
ExecStart=/opt/test-platform-backend/venv/bin/celery -A app.celery worker --loglevel=info
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### 启动服务
```bash
# 重载systemd配置
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start test-platform-backend
sudo systemctl start test-platform-celery

# 设置开机自启
sudo systemctl enable test-platform-backend
sudo systemctl enable test-platform-celery

# 查看服务状态
sudo systemctl status test-platform-backend
sudo systemctl status test-platform-celery
```

## 🧪 安装验证

### 检查服务状态
```bash
# 检查端口监听
sudo netstat -tlnp | grep -E ':(80|443|3000|5000|3306|6379)'

# 检查进程
ps aux | grep -E '(nginx|gunicorn|celery|mysql|redis)'

# 检查服务状态
sudo systemctl status nginx
sudo systemctl status mysql
sudo systemctl status redis
sudo systemctl status test-platform-backend
sudo systemctl status test-platform-celery
```

### 功能测试
```bash
# 测试API接口
curl -X GET http://localhost:5000/api/health

# 测试前端页面
curl -I http://localhost/

# 测试数据库连接
mysql -u test_user -p test_platform -e "SELECT 1;"

# 测试Redis连接
redis-cli -a your_redis_password ping
```

### 登录测试
1. 打开浏览器访问 http://your-domain.com
2. 使用管理员账号登录: admin / admin123
3. 检查各功能模块是否正常

## 🚨 故障排除

### 常见问题

#### 服务无法启动
```bash
# 查看详细错误日志
sudo journalctl -u test-platform-backend -f
sudo journalctl -u test-platform-celery -f

# 检查配置文件语法
python -c "import config; print('Config OK')"
nginx -t
```

#### 数据库连接失败
```bash
# 检查MySQL服务状态
sudo systemctl status mysql

# 测试数据库连接
mysql -u test_user -p -h localhost test_platform

# 检查防火墙设置
sudo ufw status
sudo firewall-cmd --list-all
```

#### 权限问题
```bash
# 修改文件权限
sudo chown -R www-data:www-data /opt/test-platform-backend
sudo chmod -R 755 /opt/test-platform-backend

# 检查SELinux状态 (CentOS/RHEL)
getenforce
sudo setsebool -P httpd_can_network_connect 1
```

---

> 🎉 **安装大师！** 恭喜你成功安装了巧克力测试平台！现在可以开始你的测试之旅了。如果遇到问题，记得查看日志和故障排除部分。
