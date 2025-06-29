# 📁 项目管理

项目管理是巧克力测试平台的基础功能，就像给你的测试工作建立一个"户口本"。本文档将详细介绍项目管理的各个方面，让你成为项目管理的专家！

## 🎯 项目管理概览

### 什么是项目？
在测试平台中，项目是测试工作的基本组织单位。它将相关的测试用例、测试套件、测试计划等资源组织在一起，便于统一管理和维护。

### 项目的作用
- 📋 **资源组织**: 将相关测试资源归类管理
- 👥 **权限控制**: 基于项目的访问权限管理
- 📊 **数据统计**: 按项目维度统计测试数据
- 🔄 **环境隔离**: 不同项目可以使用不同的测试环境

## 🏗️ 项目结构设计

### 项目层次结构
```
项目 (Project)
├── 测试模块 (Test Module)
│   ├── 测试用例 (Test Case)
│   └── 测试场景 (Test Scene)
├── 测试套件 (Test Suite)
│   ├── 用例组合
│   └── 执行配置
└── 测试计划 (Test Plan)
    ├── 定时配置
    └── 通知设置
```

### 项目数据模型
```typescript
interface Project {
  id: number;
  project_name: string;        // 项目名称
  project_desc: string;        // 项目描述
  project_owners: string;      // 项目负责人
  add_time: string;           // 创建时间
  update_time: string;        // 更新时间
  is_deleted: boolean;        // 是否删除
  
  // 扩展字段
  test_env?: string[];        // 测试环境
  status?: 'active' | 'inactive' | 'archived';  // 项目状态
  tags?: string[];            // 项目标签
}
```

## 📝 项目创建

### 创建项目流程

#### 1. 进入项目管理
- 在左侧菜单栏找到 **"项目管理"**
- 点击 **"项目列表"**
- 进入项目管理页面

#### 2. 填写项目信息
点击 **"新建项目"** 按钮，填写以下信息：

```
项目名称: 电商平台测试项目
项目描述: 包含用户管理、商品管理、订单管理等模块的自动化测试
项目负责人: 张三, 李四, 王五
```

#### 3. 高级配置（可选）
```
测试环境: dev, test, staging
项目标签: 电商, 核心业务, 高优先级
项目状态: 进行中
通知设置: 邮件通知, 钉钉通知
```

### 项目命名规范

#### 推荐命名格式
```
[业务域]-[系统名称]-测试项目

示例:
- 电商-用户中心-测试项目
- 支付-风控系统-测试项目
- 物流-配送系统-测试项目
```

#### 命名注意事项
- ✅ 使用有意义的名称，便于识别
- ✅ 保持命名一致性
- ✅ 避免使用特殊字符
- ❌ 不要使用过于简单的名称如"测试"、"项目1"

## 📋 项目列表管理

### 列表功能特性

#### 数据展示
项目列表展示以下信息：
- **项目名称**: 点击可进入项目详情
- **项目描述**: 项目的简要说明
- **负责人**: 项目负责人列表
- **创建时间**: 项目创建的时间
- **更新时间**: 最后更新时间
- **状态**: 项目当前状态

#### 搜索和筛选
```typescript
// 搜索条件
interface ProjectSearchParams {
  project_name?: string;      // 项目名称模糊搜索
  project_owners?: string;    // 负责人搜索
  status?: string;           // 状态筛选
  date_range?: [string, string];  // 时间范围
  tags?: string[];           // 标签筛选
}
```

#### 批量操作
- **批量删除**: 选择多个项目进行批量删除
- **批量导出**: 导出项目信息到Excel
- **批量修改状态**: 批量修改项目状态
- **批量分配负责人**: 批量修改项目负责人

### 列表操作

#### 单项操作
每个项目支持以下操作：
- 👁️ **查看详情**: 查看项目详细信息
- ✏️ **编辑**: 修改项目信息
- 📊 **统计**: 查看项目测试统计数据
- 🗂️ **管理**: 进入项目内部管理
- 🗑️ **删除**: 删除项目（需确认）

#### 快捷操作
- **快速复制**: 基于现有项目创建新项目
- **快速归档**: 将完成的项目归档
- **快速激活**: 激活暂停的项目

## 🔧 项目配置管理

### 基础配置

#### 项目信息配置
```json
{
  "project_name": "电商平台测试项目",
  "project_desc": "电商平台的自动化测试项目，包含用户、商品、订单等核心模块",
  "project_owners": ["张三", "李四", "王五"],
  "tags": ["电商", "核心业务", "自动化测试"],
  "status": "active"
}
```

#### 环境配置
```json
{
  "environments": {
    "dev": {
      "name": "开发环境",
      "base_url": "http://dev-api.example.com",
      "database": "dev_database",
      "description": "开发人员日常开发使用"
    },
    "test": {
      "name": "测试环境",
      "base_url": "http://test-api.example.com",
      "database": "test_database",
      "description": "QA团队测试使用"
    },
    "staging": {
      "name": "预发环境",
      "base_url": "http://staging-api.example.com",
      "database": "staging_database",
      "description": "生产环境模拟"
    }
  }
}
```

### 高级配置

#### 通知配置
```json
{
  "notifications": {
    "email": {
      "enabled": true,
      "recipients": ["test-team@example.com"],
      "events": ["test_failed", "test_completed"]
    },
    "dingtalk": {
      "enabled": true,
      "webhook": "https://oapi.dingtalk.com/robot/send?access_token=xxx",
      "events": ["test_failed"]
    },
    "wechat": {
      "enabled": false,
      "webhook": "",
      "events": []
    }
  }
}
```

#### 权限配置
```json
{
  "permissions": {
    "admins": ["admin@example.com"],
    "developers": ["dev1@example.com", "dev2@example.com"],
    "testers": ["tester1@example.com", "tester2@example.com"],
    "viewers": ["viewer@example.com"]
  },
  "role_permissions": {
    "admin": ["read", "write", "delete", "manage"],
    "developer": ["read", "write"],
    "tester": ["read", "write", "execute"],
    "viewer": ["read"]
  }
}
```

## 📊 项目统计分析

### 统计维度

#### 基础统计
```typescript
interface ProjectStatistics {
  // 资源统计
  total_modules: number;      // 测试模块数量
  total_cases: number;        // 测试用例数量
  total_suites: number;       // 测试套件数量
  total_plans: number;        // 测试计划数量
  
  // 执行统计
  total_executions: number;   // 总执行次数
  success_executions: number; // 成功执行次数
  failed_executions: number;  // 失败执行次数
  avg_pass_rate: number;      // 平均通过率
  
  // 时间统计
  avg_execution_time: number; // 平均执行时间
  total_execution_time: number; // 总执行时间
}
```

#### 趋势分析
```typescript
interface ProjectTrend {
  date: string;
  executions: number;         // 执行次数
  pass_rate: number;          // 通过率
  avg_duration: number;       // 平均执行时长
  new_cases: number;          // 新增用例数
  fixed_bugs: number;         // 修复问题数
}
```

### 统计图表

#### 执行趋势图
显示项目测试执行的时间趋势：
- X轴：时间（日期）
- Y轴：执行次数、通过率
- 图表类型：折线图

#### 通过率分布图
显示不同模块的通过率分布：
- 图表类型：饼图或柱状图
- 数据：各模块的通过率

#### 执行时长分析
显示测试执行时长的分布：
- 图表类型：直方图
- 数据：执行时长区间分布

## 🔄 项目生命周期管理

### 项目状态

#### 状态定义
- 🟢 **进行中 (Active)**: 项目正在活跃开发和测试
- 🟡 **暂停 (Inactive)**: 项目临时暂停
- 🔴 **已完成 (Completed)**: 项目开发完成
- ⚫ **已归档 (Archived)**: 项目已归档存储

#### 状态流转
```
新建 → 进行中 → 暂停 ⇄ 进行中 → 已完成 → 已归档
 ↓      ↓       ↓        ↓       ↓       ↓
创建   开发     暂停      恢复     完成     归档
```

### 生命周期操作

#### 项目激活
```python
def activate_project(project_id: int):
    """激活项目"""
    project = Project.query.get(project_id)
    project.status = 'active'
    project.update_time = datetime.now()
    db.session.commit()
    
    # 发送通知
    send_notification(f"项目 {project.project_name} 已激活")
```

#### 项目归档
```python
def archive_project(project_id: int):
    """归档项目"""
    project = Project.query.get(project_id)
    
    # 检查是否有正在执行的任务
    if has_running_tasks(project_id):
        raise Exception("项目有正在执行的任务，无法归档")
    
    project.status = 'archived'
    project.update_time = datetime.now()
    db.session.commit()
    
    # 清理临时数据
    cleanup_project_temp_data(project_id)
```

## 🔐 项目权限管理

### 权限模型

#### 角色定义
- **项目管理员**: 拥有项目的完全控制权
- **开发人员**: 可以创建和修改测试用例
- **测试人员**: 可以执行测试和查看结果
- **观察者**: 只能查看项目信息和测试结果

#### 权限矩阵
| 操作 | 管理员 | 开发人员 | 测试人员 | 观察者 |
|------|--------|----------|----------|--------|
| 查看项目 | ✅ | ✅ | ✅ | ✅ |
| 修改项目 | ✅ | ❌ | ❌ | ❌ |
| 删除项目 | ✅ | ❌ | ❌ | ❌ |
| 创建用例 | ✅ | ✅ | ❌ | ❌ |
| 修改用例 | ✅ | ✅ | ❌ | ❌ |
| 执行测试 | ✅ | ✅ | ✅ | ❌ |
| 查看结果 | ✅ | ✅ | ✅ | ✅ |

### 权限配置

#### 添加项目成员
```python
def add_project_member(project_id: int, user_id: int, role: str):
    """添加项目成员"""
    member = ProjectMember(
        project_id=project_id,
        user_id=user_id,
        role=role,
        added_time=datetime.now()
    )
    db.session.add(member)
    db.session.commit()
```

#### 权限检查
```python
def check_project_permission(user_id: int, project_id: int, action: str) -> bool:
    """检查项目权限"""
    member = ProjectMember.query.filter_by(
        user_id=user_id,
        project_id=project_id
    ).first()
    
    if not member:
        return False
    
    role_permissions = {
        'admin': ['read', 'write', 'delete', 'manage'],
        'developer': ['read', 'write'],
        'tester': ['read', 'execute'],
        'viewer': ['read']
    }
    
    return action in role_permissions.get(member.role, [])
```

## 💡 最佳实践

### 项目组织建议
1. **按业务域划分**: 将相关业务功能组织在同一项目中
2. **合理控制规模**: 避免项目过大或过小
3. **清晰的命名**: 使用有意义的项目名称
4. **及时更新**: 保持项目信息的及时更新

### 权限管理建议
1. **最小权限原则**: 只给用户必要的权限
2. **定期审查**: 定期审查和更新权限设置
3. **角色分离**: 明确不同角色的职责
4. **权限记录**: 记录权限变更历史

### 生命周期管理建议
1. **状态及时更新**: 根据项目实际情况及时更新状态
2. **归档策略**: 制定合理的项目归档策略
3. **数据备份**: 归档前做好数据备份
4. **清理策略**: 定期清理无用的项目数据

---

> 🎉 **项目管理专家！** 你已经掌握了项目管理的全部技能。记住，好的项目管理是成功测试的基础，让我们一起构建更好的测试项目！
