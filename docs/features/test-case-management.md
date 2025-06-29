# 📝 测试用例管理

测试用例是测试工作的基础单元，就像是测试的"DNA"。本文档将详细介绍如何在巧克力测试平台中管理测试用例的"生老病死"全流程。

## 🎯 测试用例概览

### 什么是测试用例？
测试用例是为了验证特定功能或需求而设计的一组测试步骤、输入数据和预期结果。在我们的平台中，测试用例主要来源于后端代码中的测试函数。

### 用例数据模型
```typescript
interface TestCase {
  id: number;
  case_func: string;           // 用例函数名
  case_func_desc: string;      // 用例描述
  case_sence: string;          // 测试场景
  casemoudle: {               // 所属模块
    id: number;
    moudle: string;
    desc: string;
  };
  path_desc: string;          // 接口路径描述
  tags: string;               // 标签
  update_time: string;        // 更新时间
}
```

## 🔄 用例同步机制

### 自动同步原理
平台通过扫描后端代码中的测试函数，自动生成测试用例。这种方式确保了测试用例与代码的一致性。

#### 支持的测试函数格式
```python
# 标准pytest测试函数
def test_user_login():
    """用户登录接口测试
    
    测试场景: 正常登录流程
    接口路径: POST /api/user/login
    标签: login,auth,core
    """
    # 测试逻辑
    pass

def test_user_register_success():
    """用户注册成功测试"""
    pass

def test_user_register_invalid_email():
    """用户注册-邮箱格式错误"""
    pass
```

#### 同步规则
- **函数名规则**: 以 `test_` 开头的函数
- **描述提取**: 从函数的docstring中提取描述信息
- **场景识别**: 根据函数名和描述自动识别测试场景
- **模块归类**: 根据文件路径自动归类到对应模块

### 同步操作流程

#### 1. 进入用例管理
```
导航路径: 接口测试 → 用例管理
```

#### 2. 执行同步
```bash
# 点击"同步测试用例"按钮
# 选择要同步的模块
modules = [
    "user_module",      # 用户模块
    "order_module",     # 订单模块
    "product_module"    # 商品模块
]

# 执行同步
POST /api/auto_pytest/sync_test_case
{
    "moudle_list": modules
}
```

#### 3. 同步结果
```json
{
    "success": true,
    "data": {
        "moudle_list": ["user_module", "order_module"],
        "synced_cases": 45,
        "new_cases": 12,
        "updated_cases": 8,
        "deleted_cases": 2
    },
    "msg": "同步完成"
}
```

## 📋 用例列表管理

### 列表功能特性

#### 数据展示
用例列表提供以下信息：
- **用例名称**: 函数名，点击可查看详情
- **用例描述**: 功能描述信息
- **测试场景**: 具体的测试场景
- **所属模块**: 用例归属的功能模块
- **接口路径**: API接口路径信息
- **标签**: 用例分类标签
- **更新时间**: 最后更新时间

#### 高级筛选
```typescript
interface CaseFilterParams {
  moudle?: string[];          // 模块筛选
  case_func?: string;         // 函数名搜索
  case_sence?: string;        // 场景搜索
  tags?: string;              // 标签筛选
  date_range?: [string, string]; // 时间范围
  current?: number;           // 当前页
  pageSize?: number;          // 页面大小
}
```

#### 批量操作
- **批量删除**: 删除选中的测试用例
- **批量标签**: 为选中用例添加标签
- **批量导出**: 导出用例信息到Excel
- **批量执行**: 批量执行选中的用例

### 搜索和筛选技巧

#### 模糊搜索
```bash
# 按函数名搜索
case_func: "login"  # 匹配所有包含"login"的用例

# 按场景搜索
case_sence: "用户注册"  # 匹配用户注册相关场景

# 按标签搜索
tags: "core,auth"  # 匹配包含core或auth标签的用例
```

#### 组合筛选
```json
{
  "moudle": ["user_module"],
  "case_sence": "登录",
  "tags": "core",
  "date_range": ["2024-01-01", "2024-01-31"]
}
```

## 🏷️ 用例分类管理

### 按模块分类
```
用户模块 (user_module)
├── 用户注册
│   ├── test_user_register_success
│   ├── test_user_register_invalid_email
│   └── test_user_register_duplicate_username
├── 用户登录
│   ├── test_user_login_success
│   ├── test_user_login_invalid_password
│   └── test_user_login_locked_account
└── 用户信息
    ├── test_get_user_profile
    ├── test_update_user_profile
    └── test_delete_user_account
```

### 按场景分类
```
正常流程测试
├── 用户注册成功
├── 用户登录成功
└── 订单创建成功

异常流程测试
├── 参数验证错误
├── 权限验证失败
└── 业务规则违反

边界条件测试
├── 最大值测试
├── 最小值测试
└── 空值测试
```

### 按优先级分类
```
P0 - 核心功能 (阻塞级)
├── 用户登录
├── 订单支付
└── 商品购买

P1 - 主要功能 (严重级)
├── 用户注册
├── 商品搜索
└── 购物车管理

P2 - 一般功能 (一般级)
├── 用户信息修改
├── 收藏夹管理
└── 评价系统

P3 - 辅助功能 (轻微级)
├── 帮助文档
├── 意见反馈
└── 统计报表
```

## 🔍 用例详情管理

### 用例详情信息
```json
{
  "id": 1,
  "case_func": "test_user_login_success",
  "case_func_desc": "测试用户登录成功流程",
  "case_sence": "用户登录",
  "casemoudle": {
    "id": 1,
    "moudle": "user_module",
    "desc": "用户管理模块"
  },
  "path_desc": "POST /api/user/login",
  "tags": "login,auth,core,P0",
  "update_time": "2024-01-01T10:00:00",
  "execution_history": [
    {
      "execution_time": "2024-01-01T09:00:00",
      "status": "success",
      "duration": 0.5,
      "environment": "test"
    }
  ],
  "related_suites": [
    {
      "suite_id": 1,
      "suite_name": "用户模块测试套件"
    }
  ]
}
```

### 用例执行历史
```typescript
interface ExecutionHistory {
  id: number;
  execution_time: string;     // 执行时间
  status: 'success' | 'failed' | 'skipped'; // 执行状态
  duration: number;           // 执行时长(秒)
  environment: string;        // 执行环境
  error_message?: string;     // 错误信息
  suite_id?: number;          // 所属套件ID
  plan_id?: number;           // 所属计划ID
}
```

### 用例关联信息
- **关联套件**: 包含此用例的测试套件
- **关联计划**: 包含此用例的测试计划
- **依赖关系**: 与其他用例的依赖关系
- **覆盖需求**: 覆盖的业务需求

## 🏃‍♂️ 用例执行管理

### 单个用例执行
```bash
# 执行单个测试用例
POST /api/auto_pytest/run_single_case
{
  "case_id": 1,
  "environment": "test",
  "parameters": {
    "username": "testuser",
    "password": "testpass"
  }
}
```

### 批量用例执行
```bash
# 批量执行测试用例
POST /api/auto_pytest/run_multiple_cases
{
  "case_ids": [1, 2, 3, 4, 5],
  "environment": "test",
  "execution_mode": "parallel", // parallel | sequential
  "max_workers": 3
}
```

### 执行结果处理
```python
# 执行结果数据结构
class CaseExecutionResult:
    case_id: int
    case_func: str
    status: str              # success | failed | skipped
    start_time: datetime
    end_time: datetime
    duration: float
    error_message: str
    stack_trace: str
    assertions: List[dict]
    environment: str
    
    def to_dict(self):
        return {
            'case_id': self.case_id,
            'case_func': self.case_func,
            'status': self.status,
            'duration': self.duration,
            'error_message': self.error_message,
            'environment': self.environment
        }
```

## 📊 用例统计分析

### 基础统计
```typescript
interface CaseStatistics {
  total_cases: number;        // 总用例数
  active_cases: number;       // 活跃用例数
  deprecated_cases: number;   // 废弃用例数
  
  by_module: {               // 按模块统计
    [module: string]: number;
  };
  
  by_scene: {                // 按场景统计
    [scene: string]: number;
  };
  
  by_priority: {             // 按优先级统计
    P0: number;
    P1: number;
    P2: number;
    P3: number;
  };
  
  execution_stats: {         // 执行统计
    total_executions: number;
    success_rate: number;
    avg_duration: number;
    last_execution: string;
  };
}
```

### 趋势分析
```typescript
interface CaseTrend {
  date: string;
  new_cases: number;         // 新增用例
  updated_cases: number;     // 更新用例
  executed_cases: number;    // 执行用例
  success_rate: number;      // 成功率
  avg_duration: number;      // 平均执行时长
}
```

### 质量分析
```typescript
interface CaseQuality {
  coverage_rate: number;     // 覆盖率
  stability_rate: number;    // 稳定性
  maintenance_index: number; // 维护指数
  
  top_failed_cases: Array<{  // 失败最多的用例
    case_id: number;
    case_func: string;
    failure_count: number;
    failure_rate: number;
  }>;
  
  slow_cases: Array<{        // 执行最慢的用例
    case_id: number;
    case_func: string;
    avg_duration: number;
  }>;
}
```

## 🔧 用例维护管理

### 用例生命周期
```
新建 → 开发 → 测试 → 稳定 → 维护 → 废弃
 ↓      ↓      ↓      ↓      ↓      ↓
创建   编写   调试   运行   更新   删除
```

### 用例状态管理
```python
class CaseStatus:
    DRAFT = 'draft'           # 草稿
    ACTIVE = 'active'         # 活跃
    DEPRECATED = 'deprecated' # 废弃
    ARCHIVED = 'archived'     # 归档
    
    STATUS_CHOICES = [
        (DRAFT, '草稿'),
        (ACTIVE, '活跃'),
        (DEPRECATED, '废弃'),
        (ARCHIVED, '归档'),
    ]
```

### 用例版本管理
```typescript
interface CaseVersion {
  version: string;           // 版本号
  change_log: string;        // 变更日志
  author: string;            // 修改人
  change_time: string;       // 修改时间
  changes: {                 // 具体变更
    added: string[];
    modified: string[];
    deleted: string[];
  };
}
```

### 用例清理策略
```python
# 自动清理策略
class CaseCleanupPolicy:
    # 清理长期未执行的用例
    INACTIVE_DAYS = 90
    
    # 清理失败率过高的用例
    MAX_FAILURE_RATE = 0.8
    
    # 清理执行时间过长的用例
    MAX_DURATION = 300  # 5分钟
    
    def should_cleanup(self, case):
        # 实现清理逻辑
        pass
```

## 💡 最佳实践

### 用例设计原则
1. **单一职责**: 每个用例只测试一个功能点
2. **独立性**: 用例之间不应有依赖关系
3. **可重复**: 用例应该可以重复执行
4. **清晰命名**: 用例名称应该清楚表达测试目的

### 用例组织建议
1. **模块化组织**: 按功能模块组织用例
2. **场景化分类**: 按测试场景分类用例
3. **优先级管理**: 明确用例的重要程度
4. **标签管理**: 使用标签进行灵活分类

### 用例维护建议
1. **定期同步**: 定期同步最新的测试用例
2. **及时更新**: 代码变更后及时更新用例
3. **清理废弃**: 定期清理无效的测试用例
4. **性能监控**: 监控用例执行性能

---

> 🎉 **用例管理专家！** 你已经掌握了测试用例管理的全部技能。记住，好的用例管理是高质量测试的基础！
