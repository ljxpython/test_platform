# ⚙️ 配置说明

本文档详细说明了巧克力测试平台的各种配置选项，帮助你根据实际需求进行个性化配置。

## 🎯 配置概览

### 配置文件结构
```
config/
├── config.ts              # 前端主配置文件
├── defaultSettings.ts     # 默认设置
├── proxy.ts               # 代理配置
├── routes.ts              # 路由配置
└── oneapi.json            # OpenAPI配置

backend/
├── config.py              # 后端主配置文件
├── .env                   # 环境变量配置
└── requirements.txt       # Python依赖配置
```

## 🎨 前端配置

### 主配置文件 (config/config.ts)

#### 基础配置
```typescript
export default defineConfig({
  // 应用标题
  title: '巧克力测试平台',
  
  // 哈希路由
  hash: true,
  
  // 路由配置
  routes,
  
  // 主题配置
  theme: {
    'root-entry-name': 'variable',
  },
  
  // 国际化配置
  locale: {
    default: 'zh-CN',
    antd: false,
    baseNavigator: true,
  },
});
```

#### 代理配置 (config/proxy.ts)
```typescript
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target: 'http://test-api.example.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    '/api/': {
      target: 'http://prod-api.example.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
```

### 默认设置 (config/defaultSettings.ts)
```typescript
const Settings: ProLayoutProps = {
  // 导航主题
  navTheme: 'light',
  
  // 主色调
  colorPrimary: '#1890ff',
  
  // 布局模式
  layout: 'mix',
  
  // 内容宽度
  contentWidth: 'Fluid',
  
  // 固定头部
  fixedHeader: false,
  
  // 固定侧边栏
  fixSiderbar: true,
  
  // 应用标题
  title: '巧克力测试平台',
  
  // Logo地址
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  
  // PWA支持
  pwa: true,
  
  // 色弱模式
  colorWeak: false,
};
```

### 环境变量配置
```env
# .env.local (本地开发)
REACT_APP_ENV=dev
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MOCK=false

# .env.production (生产环境)
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.example.com
REACT_APP_MOCK=false

# .env.test (测试环境)
REACT_APP_ENV=test
REACT_APP_API_URL=http://test-api.example.com
REACT_APP_MOCK=false
```

## 🔧 后端配置

### 主配置文件 (config.py)

#### 基础配置类
```python
import os
from datetime import timedelta

class Config:
    """基础配置"""
    
    # 应用配置
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    
    # 数据库配置
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql+pymysql://test_user:test_password@localhost/test_platform'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 10,
        'pool_recycle': 3600,
        'pool_pre_ping': True
    }
    
    # Redis配置
    REDIS_URL = os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'
    
    # JWT配置
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or SECRET_KEY
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # Celery配置
    CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL') or 'redis://localhost:6379/1'
    CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND') or 'redis://localhost:6379/2'
    
    # 文件上传配置
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'uploads'
    
    # 日志配置
    LOG_LEVEL = os.environ.get('LOG_LEVEL') or 'INFO'
    LOG_FILE = os.environ.get('LOG_FILE') or 'app.log'
```

#### 环境特定配置
```python
class DevelopmentConfig(Config):
    """开发环境配置"""
    DEBUG = True
    TESTING = False
    
    # 开发环境数据库
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://dev_user:dev_password@localhost/test_platform_dev'
    
    # 开发环境Redis
    REDIS_URL = 'redis://localhost:6379/0'
    
    # 日志级别
    LOG_LEVEL = 'DEBUG'

class TestingConfig(Config):
    """测试环境配置"""
    TESTING = True
    DEBUG = False
    
    # 测试数据库
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    
    # 禁用CSRF保护
    WTF_CSRF_ENABLED = False

class ProductionConfig(Config):
    """生产环境配置"""
    DEBUG = False
    TESTING = False
    
    # 生产环境安全配置
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # 日志配置
    LOG_LEVEL = 'WARNING'
    LOG_FILE = '/var/log/test-platform/app.log'
```

### 环境变量配置 (.env)
```env
# 应用环境
FLASK_ENV=production
FLASK_DEBUG=False

# 数据库配置
DATABASE_URL=mysql+pymysql://user:password@localhost/test_platform
DB_POOL_SIZE=20
DB_POOL_RECYCLE=3600

# Redis配置
REDIS_URL=redis://:password@localhost:6379/0
REDIS_POOL_SIZE=10

# JWT配置
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ACCESS_TOKEN_EXPIRES=3600
JWT_REFRESH_TOKEN_EXPIRES=2592000

# Celery配置
CELERY_BROKER_URL=redis://:password@localhost:6379/1
CELERY_RESULT_BACKEND=redis://:password@localhost:6379/2
CELERY_WORKER_CONCURRENCY=4

# 文件存储配置
UPLOAD_FOLDER=/var/uploads
MAX_CONTENT_LENGTH=16777216

# 日志配置
LOG_LEVEL=INFO
LOG_FILE=/var/log/test-platform/app.log
LOG_MAX_BYTES=10485760
LOG_BACKUP_COUNT=5

# 邮件配置
MAIL_SERVER=smtp.example.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=noreply@example.com
MAIL_PASSWORD=your-mail-password

# 测试环境配置
TEST_ENVIRONMENTS=dev,test,staging,prod
DEV_API_URL=http://dev-api.example.com
TEST_API_URL=http://test-api.example.com
STAGING_API_URL=http://staging-api.example.com
PROD_API_URL=http://prod-api.example.com
```

## 🗄️ 数据库配置

### MySQL配置优化
```sql
-- my.cnf 配置优化
[mysqld]
# 基础配置
port = 3306
bind-address = 0.0.0.0
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# 性能优化
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# 连接配置
max_connections = 200
max_connect_errors = 10000
wait_timeout = 28800
interactive_timeout = 28800

# 查询缓存
query_cache_type = 1
query_cache_size = 128M
query_cache_limit = 2M
```

### 数据库索引优化
```sql
-- 为常用查询字段添加索引
CREATE INDEX idx_test_case_module ON test_cases(module_id);
CREATE INDEX idx_test_case_func ON test_cases(case_func);
CREATE INDEX idx_test_suite_project ON test_suites(project_id);
CREATE INDEX idx_test_plan_suite ON test_plans(suite_id);
CREATE INDEX idx_test_result_plan ON test_results(plan_id);
CREATE INDEX idx_test_result_time ON test_results(created_at);

-- 复合索引
CREATE INDEX idx_test_case_module_func ON test_cases(module_id, case_func);
CREATE INDEX idx_test_result_plan_time ON test_results(plan_id, created_at);
```

## 📦 Redis配置

### Redis配置文件 (redis.conf)
```conf
# 网络配置
bind 127.0.0.1
port 6379
timeout 300
tcp-keepalive 300

# 内存配置
maxmemory 2gb
maxmemory-policy allkeys-lru

# 持久化配置
save 900 1
save 300 10
save 60 10000

# 安全配置
requirepass your-redis-password
rename-command FLUSHDB ""
rename-command FLUSHALL ""

# 日志配置
loglevel notice
logfile /var/log/redis/redis-server.log

# 客户端配置
maxclients 10000
```

### Redis集群配置
```conf
# 集群模式配置
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 15000
cluster-announce-ip 192.168.1.100
cluster-announce-port 6379
cluster-announce-bus-port 16379
```

## 🔄 Celery配置

### Celery配置文件
```python
# celery_config.py
from celery import Celery
from kombu import Queue

# Celery实例配置
celery_app = Celery('test_platform')

# 基础配置
celery_app.conf.update(
    # Broker配置
    broker_url='redis://localhost:6379/1',
    result_backend='redis://localhost:6379/2',
    
    # 任务配置
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='Asia/Shanghai',
    enable_utc=True,
    
    # Worker配置
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
    worker_disable_rate_limits=True,
    
    # 任务路由
    task_routes={
        'app.tasks.execute_test_suite': {'queue': 'test_execution'},
        'app.tasks.run_locust_test': {'queue': 'performance_test'},
        'app.tasks.send_notification': {'queue': 'notifications'},
    },
    
    # 队列配置
    task_default_queue='default',
    task_queues=(
        Queue('default'),
        Queue('test_execution'),
        Queue('performance_test'),
        Queue('notifications'),
    ),
)
```

### Celery Beat配置
```python
# 定时任务配置
celery_app.conf.beat_schedule = {
    'cleanup-old-results': {
        'task': 'app.tasks.cleanup_old_results',
        'schedule': crontab(hour=2, minute=0),  # 每天凌晨2点
    },
    'health-check': {
        'task': 'app.tasks.health_check',
        'schedule': 300.0,  # 每5分钟
    },
    'backup-database': {
        'task': 'app.tasks.backup_database',
        'schedule': crontab(hour=3, minute=0, day_of_week=0),  # 每周日凌晨3点
    },
}
```

## 🔐 安全配置

### HTTPS配置
```nginx
# SSL配置
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;

# HSTS
add_header Strict-Transport-Security "max-age=63072000" always;

# 其他安全头
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### 防火墙配置
```bash
# UFW配置 (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 3306/tcp
sudo ufw deny 6379/tcp
sudo ufw enable

# iptables配置
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 3306 -s 127.0.0.1 -j ACCEPT
iptables -A INPUT -p tcp --dport 6379 -s 127.0.0.1 -j ACCEPT
```

## 📊 监控配置

### 日志配置
```python
# logging_config.py
import logging
from logging.handlers import RotatingFileHandler

def setup_logging(app):
    if not app.debug:
        # 文件日志
        file_handler = RotatingFileHandler(
            'logs/app.log',
            maxBytes=10240000,
            backupCount=10
        )
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        
        app.logger.setLevel(logging.INFO)
        app.logger.info('Test Platform startup')
```

### 性能监控
```python
# 性能监控配置
MONITORING = {
    'enabled': True,
    'metrics_endpoint': '/metrics',
    'health_endpoint': '/health',
    'prometheus': {
        'enabled': True,
        'port': 9090,
    },
    'alerts': {
        'email': ['admin@example.com'],
        'webhook': 'https://hooks.slack.com/services/xxx',
    }
}
```

## 💡 配置最佳实践

### 环境分离
1. **开发环境**: 使用本地数据库和Redis
2. **测试环境**: 使用独立的测试数据库
3. **生产环境**: 使用高可用的数据库集群

### 安全建议
1. **密码管理**: 使用强密码和密钥管理系统
2. **网络隔离**: 数据库和Redis不对外暴露
3. **定期备份**: 设置自动备份策略
4. **监控告警**: 配置完善的监控和告警

### 性能优化
1. **连接池**: 合理配置数据库连接池
2. **缓存策略**: 使用Redis缓存热点数据
3. **异步任务**: 使用Celery处理耗时任务
4. **负载均衡**: 使用Nginx进行负载均衡

---

> 🎉 **配置专家！** 你已经掌握了平台的所有配置选项。记住，好的配置是系统稳定运行的基础！
