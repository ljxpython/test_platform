# 💻 开发环境搭建

欢迎来到巧克力测试平台的开发世界！这份指南将带你从零开始搭建完整的开发环境，让你快速上手平台开发。

## 🎯 环境要求

### 系统要求
- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **内存**: 8GB+ (推荐16GB)
- **硬盘**: 20GB+ 可用空间
- **网络**: 稳定的互联网连接

### 必需软件
- **Node.js**: 16.0+ (推荐18.x LTS)
- **Python**: 3.8+ (推荐3.9+)
- **Git**: 2.20+
- **MySQL**: 8.0+ 或 PostgreSQL 12+
- **Redis**: 6.0+

### 推荐工具
- **IDE**: VS Code, WebStorm, PyCharm
- **API测试**: Postman, Insomnia
- **数据库管理**: MySQL Workbench, DBeaver
- **版本控制**: Git GUI, SourceTree

## 🚀 快速开始

### 1. 克隆项目
```bash
# 克隆前端项目
git clone https://github.com/your-org/test-platform-frontend.git
cd test-platform-frontend

# 克隆后端项目
git clone https://github.com/ljxpython/flask_platform_srv.git
cd flask_platform_srv
```

### 2. 前端环境搭建

#### 安装Node.js
```bash
# 使用nvm安装Node.js (推荐)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# 或直接下载安装
# https://nodejs.org/
```

#### 安装依赖
```bash
cd test-platform-frontend

# 使用pnpm (推荐)
npm install -g pnpm
pnpm install

# 或使用npm
npm install

# 或使用yarn
yarn install
```

#### 配置环境变量
```bash
# 复制环境配置文件
cp .env.example .env.local

# 编辑配置文件
vim .env.local
```

**.env.local 配置示例**:
```env
# API服务地址
REACT_APP_API_URL=http://localhost:5000

# 环境标识
REACT_APP_ENV=development

# 是否启用Mock数据
REACT_APP_MOCK=false
```

#### 启动前端服务
```bash
# 开发模式启动
pnpm start
# 或
npm run start:dev

# 浏览器自动打开 http://localhost:8000
```

### 3. 后端环境搭建

#### 安装Python
```bash
# 使用pyenv安装Python (推荐)
curl https://pyenv.run | bash
pyenv install 3.9.16
pyenv global 3.9.16

# 或直接下载安装
# https://www.python.org/downloads/
```

#### 创建虚拟环境
```bash
cd flask_platform_srv

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

#### 安装依赖
```bash
# 安装Python依赖
pip install -r requirements.txt

# 如果有requirements-dev.txt
pip install -r requirements-dev.txt
```

#### 配置数据库
```bash
# 安装MySQL (macOS)
brew install mysql
brew services start mysql

# 安装MySQL (Ubuntu)
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql

# 创建数据库
mysql -u root -p
CREATE DATABASE test_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'test_password';
GRANT ALL PRIVILEGES ON test_platform.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 配置Redis
```bash
# 安装Redis (macOS)
brew install redis
brew services start redis

# 安装Redis (Ubuntu)
sudo apt install redis-server
sudo systemctl start redis-server

# 测试Redis连接
redis-cli ping
# 应该返回 PONG
```

#### 配置环境变量
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
    REDIS_URL = 'redis://localhost:6379/0'
    
    # JWT配置
    JWT_SECRET_KEY = 'your-secret-key-here'
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    
    # Celery配置
    CELERY_BROKER_URL = 'redis://localhost:6379/1'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/2'
    
    # 测试环境配置
    TEST_ENVIRONMENTS = {
        'dev': 'http://dev-api.example.com',
        'test': 'http://test-api.example.com',
        'staging': 'http://staging-api.example.com'
    }

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
```

#### 初始化数据库
```bash
# 初始化数据库表
python manage.py db init
python manage.py db migrate -m "Initial migration"
python manage.py db upgrade

# 创建初始数据
python manage.py init-data
```

#### 启动后端服务
```bash
# 启动Flask应用
python app.py

# 或使用gunicorn (生产环境)
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# 启动Celery Worker (新终端)
celery -A app.celery worker --loglevel=info

# 启动Celery Beat (定时任务，新终端)
celery -A app.celery beat --loglevel=info
```

## 🔧 开发工具配置

### VS Code配置

#### 推荐插件
```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.flake8",
    "ms-python.black-formatter",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml"
  ]
}
```

#### 工作区设置
```json
{
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "typescriptreact"
  }
}
```

### Git配置

#### 全局配置
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
```

#### 项目Git Hooks
```bash
# 安装pre-commit
pip install pre-commit

# 安装hooks
pre-commit install

# 手动运行检查
pre-commit run --all-files
```

**.pre-commit-config.yaml**:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/psf/black
    rev: 22.10.0
    hooks:
      - id: black

  - repo: https://github.com/pycqa/flake8
    rev: 5.0.4
    hooks:
      - id: flake8

  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: v3.0.0-alpha.4
    hooks:
      - id: prettier
        files: \.(js|ts|jsx|tsx|json|css|md)$
```

## 🐳 Docker开发环境

### Docker Compose配置
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_API_URL=http://localhost:5000

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    environment:
      - FLASK_ENV=development
      - DATABASE_URL=mysql+pymysql://root:password@mysql:3306/test_platform
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=test_platform
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:6.2-alpine
    ports:
      - "6379:6379"

  celery:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    command: celery -A app.celery worker --loglevel=info
    volumes:
      - ./backend:/app
    environment:
      - CELERY_BROKER_URL=redis://redis:6379/1
    depends_on:
      - redis

volumes:
  mysql_data:
```

### 启动Docker环境
```bash
# 构建并启动所有服务
docker-compose -f docker-compose.dev.yml up --build

# 后台运行
docker-compose -f docker-compose.dev.yml up -d

# 查看日志
docker-compose -f docker-compose.dev.yml logs -f

# 停止服务
docker-compose -f docker-compose.dev.yml down
```

## 🧪 测试环境配置

### 前端测试
```bash
# 安装测试依赖
pnpm add -D @testing-library/react @testing-library/jest-dom

# 运行测试
pnpm test

# 生成覆盖率报告
pnpm test:coverage
```

### 后端测试
```bash
# 安装测试依赖
pip install pytest pytest-cov pytest-mock

# 运行测试
pytest

# 生成覆盖率报告
pytest --cov=app --cov-report=html
```

### 集成测试
```bash
# 启动测试数据库
docker run -d --name test-mysql -e MYSQL_ROOT_PASSWORD=test -p 3307:3306 mysql:8.0

# 运行集成测试
TESTING=true pytest tests/integration/

# 清理测试环境
docker stop test-mysql && docker rm test-mysql
```

## 🔍 调试配置

### VS Code调试配置
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Flask",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/app.py",
      "env": {
        "FLASK_ENV": "development",
        "FLASK_DEBUG": "1"
      },
      "args": [],
      "jinja": true,
      "justMyCode": true
    },
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["start"]
    }
  ]
}
```

### 浏览器调试
```javascript
// 在React组件中添加断点
debugger;

// 使用console调试
console.log('Debug info:', data);
console.table(arrayData);
console.group('API Response');
console.log('Status:', response.status);
console.log('Data:', response.data);
console.groupEnd();
```

## 🚨 常见问题解决

### 端口冲突
```bash
# 查看端口占用
lsof -i :8000
netstat -tulpn | grep :8000

# 杀死进程
kill -9 <PID>

# 修改端口配置
# 前端: package.json 中的 scripts
# 后端: app.py 中的 port 参数
```

### 依赖安装失败
```bash
# 清理npm缓存
npm cache clean --force
pnpm store prune

# 清理pip缓存
pip cache purge

# 使用国内镜像
npm config set registry https://registry.npmmirror.com/
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

### 数据库连接失败
```bash
# 检查MySQL服务状态
sudo systemctl status mysql

# 重启MySQL服务
sudo systemctl restart mysql

# 检查连接配置
mysql -u test_user -p -h localhost test_platform
```

### Redis连接失败
```bash
# 检查Redis服务状态
redis-cli ping

# 重启Redis服务
sudo systemctl restart redis-server

# 检查配置文件
sudo vim /etc/redis/redis.conf
```

## 💡 开发最佳实践

### 代码规范
1. **Python**: 遵循PEP 8规范，使用black格式化
2. **JavaScript/TypeScript**: 使用Prettier格式化，遵循ESLint规则
3. **Git提交**: 使用约定式提交格式

### 分支管理
```bash
# 功能开发分支
git checkout -b feature/user-management

# 修复分支
git checkout -b fix/login-bug

# 发布分支
git checkout -b release/v1.2.0
```

### 环境隔离
- **开发环境**: 本地开发和调试
- **测试环境**: 功能测试和集成测试
- **预发环境**: 生产环境模拟
- **生产环境**: 正式运行环境

---

> 🎉 **开发环境大师！** 你已经成功搭建了完整的开发环境。现在可以开始愉快的编码之旅了！记住，好的开发环境是高效开发的基础。
