#!/usr/bin/env python3
"""
Excel to JSON Converter for Navigation Website
Converts website_links_complete.xlsx to JSON format
"""

import pandas as pd
import json
from datetime import datetime
from urllib.parse import urlparse
import sys
import os

def validate_url(url):
    """验证 URL 格式"""
    if pd.isna(url):
        return False
    url_str = str(url).strip()
    return url_str.startswith('http://') or url_str.startswith('https://')

def get_domain(url):
    """从 URL 中提取域名"""
    try:
        parsed = urlparse(url)
        return parsed.netloc
    except:
        return None

def convert_excel_to_json(excel_file, output_file):
    """转换 Excel 文件为 JSON 格式"""

    print(f"📖 正在读取 {excel_file}...")

    # 读取 Excel 文件
    try:
        df = pd.read_excel(excel_file)
    except Exception as e:
        print(f"❌ 读取 Excel 文件失败: {e}")
        sys.exit(1)

    print(f"✓ 成功读取 {len(df)} 条记录")

    # 数据验证
    invalid_urls = []
    for idx, row in df.iterrows():
        if not validate_url(row['url']):
            invalid_urls.append((idx + 2, row.get('text', 'N/A'), row.get('url', 'N/A')))

    if invalid_urls:
        print(f"\n⚠️  发现 {len(invalid_urls)} 个无效 URL:")
        for line, name, url in invalid_urls[:5]:  # 只显示前5个
            print(f"   行 {line}: {name} - {url}")
        if len(invalid_urls) > 5:
            print(f"   ... 还有 {len(invalid_urls) - 5} 个")

    # 按分类组织数据
    categories = {}

    for _, row in df.iterrows():
        section = row['section']

        # 跳过无效 URL
        if not validate_url(row['url']):
            continue

        if section not in categories:
            categories[section] = {
                'id': section.lower().replace(' ', '-'),
                'name': section,
                'links': []
            }

        # 创建链接对象
        link = {
            'id': int(row['id']) if pd.notna(row['id']) else len(categories[section]['links']) + 1,
            'name': str(row['text']).strip() if pd.notna(row['text']) else 'Unnamed',
            'url': str(row['url']).strip(),
            'description': str(row['description']).strip() if pd.notna(row['description']) else None,
            'domain': get_domain(row['url'])
        }

        categories[section]['links'].append(link)

    # 构建最终 JSON 结构
    output_data = {
        'version': '1.0.0',
        'updatedAt': datetime.now().isoformat(),
        'totalLinks': sum(len(cat['links']) for cat in categories.values()),
        'totalCategories': len(categories),
        'categories': list(categories.values())
    }

    # 自定义排序：首页放在最前面，其他按链接数量降序排序
    def sort_categories(cat):
        if cat['name'] == '首页':
            return (0, 0)  # 首页优先级最高
        else:
            return (1, -len(cat['links']))  # 其他按链接数量降序

    output_data['categories'].sort(key=sort_categories)

    # 写入 JSON 文件
    print(f"\n📝 正在写入 {output_file}...")

    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"❌ 写入 JSON 文件失败: {e}")
        sys.exit(1)

    print(f"✓ 成功写入 JSON 文件")

    # 输出统计信息
    print(f"\n📊 数据统计:")
    print(f"   总分类数: {output_data['totalCategories']}")
    print(f"   总链接数: {output_data['totalLinks']}")
    print(f"   有效链接: {output_data['totalLinks']}")
    print(f"   无效链接: {len(invalid_urls)}")

    print(f"\n📁 分类详情:")
    for cat in output_data['categories'][:10]:  # 显示前10个分类
        print(f"   {cat['name']}: {len(cat['links'])} 个链接")

    print(f"\n✅ 转换完成！")
    print(f"   输出文件: {output_file}")

    return output_data

if __name__ == '__main__':
    # 获取脚本所在目录的父目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    parent_dir = os.path.dirname(project_root)

    # 设置文件路径
    excel_file = os.path.join(parent_dir, 'website_links_complete.xlsx')
    output_file = os.path.join(project_root, 'public', 'data', 'links.json')

    print("=" * 60)
    print("Excel to JSON Converter - Navigation Website")
    print("=" * 60)
    print(f"输入文件: {excel_file}")
    print(f"输出文件: {output_file}")
    print("=" * 60 + "\n")

    # 检查输入文件是否存在
    if not os.path.exists(excel_file):
        print(f"❌ 找不到 Excel 文件: {excel_file}")
        print(f"\n💡 提示: 请确保 website_links_complete.xlsx 文件在正确的位置")
        sys.exit(1)

    # 执行转换
    convert_excel_to_json(excel_file, output_file)
