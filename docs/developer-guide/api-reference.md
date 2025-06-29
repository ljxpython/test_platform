# 📖 API文档

欢迎来到巧克力测试平台的API文档！这里是开发者的宝典，包含了所有API接口的详细说明。让我们一起探索这些强大的接口吧！

## 🎯 API概览

### 基础信息
- **Base URL**: `http://your-domain.com/api`
- **认证方式**: Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

### 统一响应格式
```json
{
  "success": true,
  "data": {
    // 具体数据内容
  },
  "msg": "操作成功",
  "code": 200
}
```

### 状态码说明
- `200`: 请求成功
- `400`: 请求参数错误
- `401`: 未授权访问
- `403`: 权限不足
- `404`: 资源不存在
- `500`: 服务器内部错误

## 🔐 认证接口

### 用户登录
```http
POST /api/user/login
```

**请求参数**:
```json
{
  "username": "admin",
  "password": "password123"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "access": 1,
      "email": "admin@example.com"
    }
  },
  "msg": "登录成功"
}
```

### 获取当前用户信息
```http
GET /api/user/current
```

**请求头**:
```
Authorization: Bearer {token}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "access": 1,
    "email": "admin@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

## 📁 项目管理接口

### 创建项目
```http
POST /api/auto_pytest/create_project
```

**请求参数**:
```json
{
  "project_name": "电商平台测试",
  "project_desc": "电商平台的自动化测试项目",
  "project_owners": "张三,李四"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "project": {
      "id": 1,
      "project_name": "电商平台测试",
      "project_desc": "电商平台的自动化测试项目",
      "project_owners": "张三,李四",
      "add_time": "2024-01-01T10:00:00",
      "update_time": "2024-01-01T10:00:00"
    }
  },
  "msg": "项目创建成功"
}
```

### 获取项目列表
```http
GET /api/auto_pytest/get_project_list
```

**查询参数**:
- `page`: 页码 (默认: 1)
- `pageSize`: 每页数量 (默认: 10)
- `project_name`: 项目名称 (可选)

**响应示例**:
```json
{
  "success": true,
  "data": {
    "current": 1,
    "pageSize": 10,
    "total": 25,
    "data": [
      {
        "id": 1,
        "project_name": "电商平台测试",
        "project_desc": "电商平台的自动化测试项目",
        "project_owners": "张三,李四",
        "add_time": "2024-01-01T10:00:00",
        "update_time": "2024-01-01T10:00:00"
      }
    ]
  }
}
```

### 更新项目
```http
POST /api/auto_pytest/update_project
```

**请求参数**:
```json
{
  "id": 1,
  "project_name": "电商平台测试V2",
  "project_desc": "更新后的项目描述",
  "project_owners": "张三,李四,王五"
}
```

### 删除项目
```http
POST /api/auto_pytest/delete_project
```

**请求参数**:
```json
{
  "id": 1
}
```

## 📝 测试用例接口

### 同步测试用例
```http
POST /api/auto_pytest/sync_test_case
```

**请求参数**:
```json
{
  "moudle_list": ["user_module", "order_module"]
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "moudle_list": ["user_module", "order_module"]
  },
  "msg": "同步成功"
}
```

### 查询测试用例
```http
POST /api/auto_pytest/get_case
```

**请求参数**:
```json
{
  "moudle": ["user_module"],
  "case_func": "test_user_login",
  "case_sence": "用户登录",
  "tags": "login",
  "current": 1,
  "pageSize": 10
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "current": 1,
    "pageSize": 10,
    "total": 50,
    "data": [
      {
        "id": 1,
        "case_func": "test_user_login",
        "case_func_desc": "测试用户登录功能",
        "case_sence": "用户登录",
        "casemoudle": {
          "id": 1,
          "moudle": "user_module",
          "desc": "用户模块",
          "add_time": "2024-01-01T10:00:00",
          "update_time": "2024-01-01T10:00:00"
        },
        "path_desc": "/api/user/login",
        "tags": "login,auth",
        "update_time": "2024-01-01T10:00:00"
      }
    ]
  }
}
```

### 获取测试场景
```http
GET /api/auto_pytest/get_case_sence
```

**查询参数**:
- `moudle`: 模块名称 (可选)

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "case_sence": "用户登录",
      "count": 5
    },
    {
      "case_sence": "用户注册",
      "count": 3
    }
  ]
}
```

## 📦 测试套件接口

### 创建测试套件
```http
POST /api/auto_pytest/create_suite
```

**请求参数**:
```json
{
  "project": 1,
  "suite_name": "用户模块测试套件",
  "describe": "包含用户注册、登录等功能测试",
  "case_ids": "1,2,3,4,5",
  "test_type": "接口测试",
  "test_env": "dev"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "suite": {
      "id": 1,
      "suite_name": "用户模块测试套件",
      "describe": "包含用户注册、登录等功能测试",
      "project": {
        "id": 1,
        "project_name": "电商平台测试"
      },
      "case_sences": ["用户登录", "用户注册"],
      "add_time": "2024-01-01T10:00:00",
      "update_time": "2024-01-01T10:00:00"
    }
  },
  "msg": "套件创建成功"
}
```

### 获取测试套件列表
```http
GET /api/auto_pytest/get_suite_list
```

**查询参数**:
- `project`: 项目ID (可选)
- `suite_name`: 套件名称 (可选)
- `current`: 页码 (默认: 1)
- `pageSize`: 每页数量 (默认: 10)

### 更新测试套件
```http
POST /api/auto_pytest/update_suite
```

**请求参数**:
```json
{
  "id": 1,
  "suite_name": "用户模块测试套件V2",
  "describe": "更新后的套件描述",
  "case_ids": "1,2,3,4,5,6"
}
```

### 根据用例ID同步套件
```http
POST /api/auto_pytest/sync_suite_by_case_ids
```

**请求参数**:
```json
{
  "suite_id": 1,
  "case_sences": ["用户登录", "用户注册", "用户信息修改"]
}
```

### 删除测试套件
```http
POST /api/auto_pytest/delete_suite
```

**请求参数**:
```json
{
  "id": 1
}
```

## ⏰ 测试计划接口

### 创建测试计划
```http
POST /api/auto_pytest/create_case_plant
```

**请求参数**:
```json
{
  "suite": 1,
  "plan_name": "每日回归测试",
  "cron": "0 2 * * *",
  "test_env": "test",
  "is_open": "1"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "plan_name": "每日回归测试",
    "suite": 1,
    "cron": "0 2 * * *",
    "test_env": "test",
    "is_open": "1",
    "add_time": "2024-01-01T10:00:00",
    "update_time": "2024-01-01T10:00:00"
  },
  "msg": "计划创建成功"
}
```

### 获取测试计划列表
```http
GET /api/auto_pytest/list_case_plant
```

**查询参数**:
- `plan_name`: 计划名称 (可选)
- `suite`: 套件ID (可选)
- `current`: 页码 (默认: 1)
- `pageSize`: 每页数量 (默认: 10)

### 更新测试计划
```http
POST /api/auto_pytest/update_case_plant
```

### 删除测试计划
```http
POST /api/auto_pytest/del_case_plant
```

### 定时执行测试计划
```http
POST /api/auto_pytest/set_case_result_by_cron
```

**请求参数**:
```json
{
  "plan_id": 1
}
```

## 🏃‍♂️ 测试执行接口

### 运行测试套件
```http
POST /api/auto_pytest/run_case_suite
```

**请求参数**:
```json
{
  "suite_id": 1,
  "test_env": "dev",
  "run_type": "manual"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "task_id": "abc123-def456-ghi789",
    "status": "running"
  },
  "msg": "测试开始执行"
}
```

### 获取测试结果
```http
GET /api/auto_pytest/get_case_result
```

**查询参数**:
- `task_id`: 任务ID
- `suite_id`: 套件ID (可选)
- `current`: 页码 (默认: 1)
- `pageSize`: 每页数量 (默认: 10)

**响应示例**:
```json
{
  "success": true,
  "data": {
    "current": 1,
    "pageSize": 10,
    "total": 1,
    "data": [
      {
        "id": 1,
        "task_id": "abc123-def456-ghi789",
        "suite_id": 1,
        "test_env": "dev",
        "status": "completed",
        "total_cases": 10,
        "passed_cases": 8,
        "failed_cases": 2,
        "pass_rate": 80.0,
        "start_time": "2024-01-01T10:00:00",
        "end_time": "2024-01-01T10:05:00",
        "duration": 300,
        "report_url": "http://example.com/report/1"
      }
    ]
  }
}
```

## 🦗 Locust压力测试接口

### 运行Locust测试
```http
POST /api/locust_test/run_locust_test
```

**请求参数**:
```json
{
  "title": "首页压力测试",
  "locustsuite": "homepage_suite",
  "force": false,
  "test_env": "test"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1
  },
  "msg": "压力测试启动成功"
}
```

### 停止Locust测试
```http
POST /api/locust_test/stop_locust_task
```

### 检查Locust进程
```http
GET /api/locust_test/check_locust_process
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "is_running": true,
    "process_id": 12345,
    "start_time": "2024-01-01T10:00:00",
    "web_url": "http://localhost:8089"
  }
}
```

### 获取Locust测试详情
```http
GET /api/locust_test/get_locust_test_detail
```

### 获取Locust测试结果列表
```http
GET /api/locust_test/list_locust_result
```

**查询参数**:
- `title`: 测试标题 (可选)
- `status`: 测试状态 (可选)
- `current`: 页码 (默认: 1)
- `pageSize`: 每页数量 (默认: 10)

## 🔧 系统管理接口

### 同步测试模块
```http
POST /api/auto_pytest/sync_test_moudle
```

### 更新测试模块
```http
POST /api/auto_pytest/update_test_moudle
```

**请求参数**:
```json
{
  "id": 1,
  "moudle": "user_module",
  "desc": "用户模块描述"
}
```

## 📊 统计分析接口

### 获取测试统计数据
```http
GET /api/statistics/test_overview
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "total_projects": 10,
    "total_suites": 50,
    "total_cases": 500,
    "total_executions": 1000,
    "avg_pass_rate": 85.5,
    "recent_executions": [
      {
        "date": "2024-01-01",
        "executions": 25,
        "pass_rate": 88.0
      }
    ]
  }
}
```

## 🚨 错误处理

### 错误响应格式
```json
{
  "success": false,
  "data": null,
  "msg": "错误描述",
  "code": 400,
  "error_detail": {
    "field": "username",
    "message": "用户名不能为空"
  }
}
```

### 常见错误码
- `400001`: 参数验证失败
- `401001`: Token无效或过期
- `403001`: 权限不足
- `404001`: 资源不存在
- `500001`: 服务器内部错误

## 💡 使用示例

### JavaScript/TypeScript
```typescript
// 使用fetch调用API
const response = await fetch('/api/auto_pytest/get_case', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    moudle: ['user_module'],
    current: 1,
    pageSize: 10
  })
});

const result = await response.json();
if (result.success) {
  console.log('测试用例:', result.data);
} else {
  console.error('请求失败:', result.msg);
}
```

### Python
```python
import requests

# 调用API示例
url = 'http://your-domain.com/api/auto_pytest/get_case'
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {token}'
}
data = {
    'moudle': ['user_module'],
    'current': 1,
    'pageSize': 10
}

response = requests.post(url, json=data, headers=headers)
result = response.json()

if result['success']:
    print('测试用例:', result['data'])
else:
    print('请求失败:', result['msg'])
```

---

> 🎉 **API专家！** 你已经掌握了所有API接口的使用方法。记住，好的API不仅要功能强大，还要简单易用！
