#!/usr/local/bin/node
// node cli 应用入口文件必须要有这样的文件头
// 如果是Linux 或者macos系统下还需要修改此文件的读写权限为755
// 具体就是通过 chmod 755 cli.js 实现修改
// yarn publish 发布npm
// 脚手架的工作过程
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件
const inquirer = require('inquirer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
]).then(anwsers => {
    // console.log('anw', anwsers)
    const tmplDir = path.join(__dirname, 'templates');
    const destDir = process.cwd();
    fs.readdir(tmplDir,(err,files) => {
        if(err) throw err;
        files.forEach(file => {
            console.log(file)
            ejs.renderFile(path.join(tmplDir,file),anwsers,(err,res) => {
                if(err) throw err;
                console.log('success',res)
                // 将结果写入目标文件路径
                fs.writeFileSync(path.join(destDir, file), res)
            })
        })
    })

})