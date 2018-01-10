""" 小程序颜色统一，方便颜色管理，替换颜色常量 """
# -*- coding: UTF-8 -*-
import os
import re


prop_map = {}

def gci(root, level):
    """ 迭代遍历当前目录，输出文件名 """
    parents = os.listdir(root)
    tab_nums = ""

    for cnt in range(level):
        tab_nums += "  "

    print(tab_nums+"@"+root)

    for parent in parents:
        child = os.path.join(root, parent)
        if not os.path.isdir(child):
            print(tab_nums+child)

    for parent in parents:
        child = os.path.join(root, parent)
        if os.path.isdir(child):
            gci(child, level+1)

def search_dir(root, callback):
    """" 以root为起点，遍历搜寻文件"""
    parents = os.listdir(root)
    for parent in parents:
        child = os.path.join(root, parent)
        if not os.path.isdir(child):
            callback(root,parent)

    for parent in parents:
        child = os.path.join(root, parent)
        if os.path.isdir(child):
            search_dir(child, callback)

def i_print(file_path, file_name):
    ''' 读取文件内容 '''
    # 限制文件类型
    file_pattern = re.compile(r'([\s\S]+).zcss$')
    file_name_no_suf_match = file_pattern.match(file_name)
    if file_name_no_suf_match is None:
        return
    file_name_no_suf = file_name_no_suf_match.group(1)
    file = os.path.join(file_path, file_name)
    file_content = ""
    with open(file, 'r', encoding='utf-8') as some_files:
        file_content = some_files.read()
    expr_pattern = re.compile(r'{{gsy.const.color.([\w_]+)}}')
    new_content = expr_pattern.sub(replace_method, file_content)
    with open(file_path+os.sep+file_name_no_suf+('.wxss'), 'w') as out_files:
        out_files.write(new_content)

def replace_method(match):
    expr = match.group(1)
    return prop_map[expr]

def getInitProp(file_name):
    """ 读取参数值 """
    with open(file_name, 'r', encoding='utf-8') as prop_file:
        content = prop_file.read()
        key_value_p = re.compile(r'([\w_]+)\s+=\s+([\w#\d]+)')
        keys_value = key_value_p.finditer(content)
        for key_group in keys_value:
            key = key_group.group(1)
            value = key_group.group(2)
            prop_map[key] = value

if __name__ == '__main__':
    # todo 遍历当前路径下所有文件 (含子文件中的)
    # 读取后缀为 .zcss 的文件,替换其中 {{gsy.const.color.*}} 为 * 在 gsy-const.json 中的对应值
    # 
    getInitProp("./gsy-const.properties")
    search_dir(".", i_print)